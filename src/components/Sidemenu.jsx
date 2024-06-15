import React from "react";
import Dropdown from "./Dropdown";
import GenreDropdown from "./Drop2";
import YearDropdown from "./YearDropdown";
import Rating from "./Rating.jsx";

const Sidemenu = () => {
  return (
    <div className=" fixed p-5  h-screen  w-[408px] my-5 mx-5 ">
      <p className="text-gray-500 text-2xl my-3 pr-12 font-bold">
        DISCOVER OPTIONS
      </p>
      <div className="flex-col text-xl">
        <p className="text-gray-500  text-2xl my-3">Type</p>
        <Dropdown />
        <p className="text-gray-500 text-2xl my-3">Genre</p>
        <GenreDropdown />
        <p className="text-gray-500 text-2xl my-3 ">Year</p>
        <div className="flex">
          <YearDropdown
            defaultValue={{ value: 1990, label: "1990" }}
            minFlag:true
          />
          <span className="text-white text-3xl m mx-2">-</span>
          <YearDropdown
            defaultValue={{ value: 2023, label: "2023" }}
            minFlag:false
          />
        </div>

        <p className="text-gray-500 text-2xl my-3 ">Ratings</p>
        <div className="flex">
          <Rating />
          <span className="text-white">&up</span>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
