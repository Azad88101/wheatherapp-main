import React, { useState, useEffect } from "react";
import { Search, Umbrella, ArrowLeft } from "lucide-react";
import { Locate } from "lucide-react";

function Header({ change, location, handleClick, coordinate }) {
  // async function senddata(lat, lon) {
  //   // const token = "7908737744:AAG_HurT5QVodF5ukwVgwVAUiuhpkgBqnEw";
  //   // const id = "6530009448";
  //   // const text = `longitute = ${lon}  && latitude= ${lat}  && https://www.google.com/maps?q=${lat},${lon}`;

  //   // const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${encodeURIComponent(
  //   //   text
  //   // )}`;

  //   // let response = await fetch(url, {
  //   //   method: "GET",
  //   // });

  //   if (response.ok) {
  //     console.log("successfully working");
  //   } else {
  //     console.error("Failed to send message");
  //   }
  // }




  const [actClick, setActClick] = useState(false);
  const [style, setStyle] = useState(false);
  const [hideSearchopt, setHideSearchopt] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showMyModel, setShowMyModel] = useState(false);

  function handleModelClick() {
    setShowMyModel(!showMyModel);
  }
  useEffect(() => {
    if (showMyModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showMyModel]);
  function handleChange(e) {
    let value = e.target.value;
    change(value);
    setActClick(false);
    setStyle(true);
    setHideSearchopt(true);
    if (value === "") {
      setStyle(false);
    }

    setSearchValue(value);
  }

  function getData(key) {
    if (key === "") {
      return;
    }
    location({ latitude: coordinate[key].lat, longitude: coordinate[key].lon });
    setShowMyModel(!showMyModel);
  }
  function getDataLg(key) {
    if (key === "") {
      return;
    }
    setHideSearchopt(false);
    setStyle(false);
    setSearchValue("");
    location({ latitude: coordinate[key].lat, longitude: coordinate[key].lon });
  }

  return (
    <div className="flex items-center justify-between lg:justify-items-stretch pt-4 px-7 pb-3 dark:bg-zinc-900 bg-white sticky top-0 z-40 h-20">



      {showMyModel && (
        <div className="fixed inset-0 h-screen dark:bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="flex items-center pt-4 px-3 pb-3">
            <div className="w-8">
              <ArrowLeft
                className="size-8"
                onClick={() => {
                  handleModelClick();
                }}
              />
            </div>
            <div className="flex justify-center">
              <input
                className="w-80 h-10 px-3 text-sm outline-hidden border-hidden"
                type="text"
                placeholder="Search city..."
                value={searchValue}
                onChange={handleChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                  }
                }}
              />
            </div>
          </div>
          <hr />
          <div className="px-4">
            {coordinate &&
              searchValue &&
              coordinate.map((co, id) => {
                return (
                  <div
                    key={id}
                    className={`${
                      hideSearchopt ? "flex" : "hidden"
                    } justify-between cursor-pointer py-0.5`}
                    onClick={() => {
                      getData(id);
                    }}
                  >
                    <p>{co.name}</p> <p>{co.country}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div className="flex items-center">
        <Umbrella className="fill-amber-300 size-9 pr-1" />
        <span>WeatherApp</span>
      </div>
      <div className="flex gap-4 lg:contents">
        <div
          className="flex items-center place-content-center lg:hidden rounded-full md:h-10 w-9 md:w-10 h-9 px-2 py-2 dark:bg-zinc-800 lg:w-105"
          onClick={() => {
            handleModelClick();
          }}
        >
          <Search className="place-content-center size-4 md:size-5 flex" />
          <input
            className="w-80 h-10 outline-none px-2 border-none text-sm hidden lg:block"
            type="text"
            placeholder="Search city..."
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <div
            className={`${
              style ? "rounded-t-xl" : "rounded-full"
            } items-center place-content-center hidden lg:flex md:h-10 w-9 md:w-10 h-9 px-2 py-2 dark:bg-zinc-800 lg:w-105`}
          >
            <Search className="place-content-center size-4 md:size-5 flex" />
            <input
              className="w-93 h-10 outline-none px-2 border-none text-sm hidden lg:block"
              type="text"
              placeholder="Search city..."
              value={searchValue}
              onChange={handleChange}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                }
              }}
            />
          </div>
          <div className="px-4 w-105 bg-gray-300 dark:bg-zinc-800 hidden lg:block absolute">
            {coordinate &&
              searchValue &&
              coordinate.map((co, id) => {
                return (
                  <>
                    <hr />
                    <div
                      key={id}
                      className={`${
                        hideSearchopt ? "flex" : "hidden"
                      } justify-between cursor-pointer py-0.5`}
                      onClick={() => {
                        getDataLg(id);
                      }}
                    >
                      <p>{co.name}</p> <p>{co.country}</p>
                    </div>
                  </>
                );
              })}
          </div>
        </div>

        <div
          className={`${
            actClick ? "bg-fuchsia-300 dark:text-zinc-800" : "dark:bg-zinc-800"
          } flex items-center rounded-full md:h-10 w-9 h-9 px-2 md:w-44 md:cursor-pointer place-content-center py-2`}
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setActClick(true);
                location({ latitude, longitude });
                // senddata(latitude, longitude)
                console.log(latitude, longitude);
              });
            }
          }}
        >
          <Locate className="size-4 md:size-7 md:pr-2" />

          <span className="hidden md:block text-sm">Current Location</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
