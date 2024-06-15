import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterMoviesFetch,
  getMoviesFetch,
  searchMoviesFetch,
} from "../store/movieState";
import { Link } from "react-router-dom";
import _debounce from "lodash/debounce";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Popular");
  const dispatch = useDispatch();
  const domain = useSelector((state) => state.movies.domain);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (link) => {
    setActiveLink(link);
    dispatch(filterMoviesFetch({ domain: domain, filter: link }));
  };

  const debouncedSearch = _debounce((query) => {
    if (query.trim() === "") {
      dispatch(getMoviesFetch(domain));
    } else {
      dispatch(searchMoviesFetch({ domain: domain, query: query }));
    }
  }, 2000);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
     
      dispatch(searchMoviesFetch({ domain: domain, query: searchQuery }));
    } else {
      dispatch(getMoviesFetch(domain));
    }
  };

  return (
    <header className="p-4 text-white sm:m-0 bg-custom-dark sm:w-9/12   ml-[77px] mt-[17px] text-4xl sm:fixed  justify-around  flex ">
      <a
        href="/"
        className="text-white  cursor-pointer text-5xl sm:text-4xl sm:text-white"
        onClick={() => window.location.reload()}
      >
        Discover
      </a>
      <ul className=" text-xl sm:bg-pink hidden sm:flex  font-black  my-1 gap-10">
        <li>
          <Link
            to="/popular"
            onClick={() => handleClick("popular")}
            className="text-2xl"
            style={{ color: activeLink === "popular" ? "white" : "#3B82F6" }}
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            to="/trend"
            onClick={() => handleClick("trending")}
            className="text-2xl"
            style={{ color: activeLink === "trending" ? "white" : "#3B82F6" }}
          >
            Trend
          </Link>
        </li>
        <li>
          <Link
            to="/new"
            onClick={() =>
              handleClick(domain == "movie" ? "now_playing" : "on_the_air")
            }
            className="text-2xl"
            style={{
              color: activeLink === "now_playing" || activeLink === "on_the_air" ? "white" : "#3B82F6",
            }}
          >
            Newest
          </Link>
        </li>
        <li  style={{width:"max-content"}}>
          <Link
            to="/top"
            onClick={() => handleClick("top_rated")}
            className="text-2xl  "
            style={{ color: activeLink === "top_rated" ? "white" : "#3B82F6" }}
          >
            Top rated
          </Link>
        </li>
      </ul>
      <div className="hidden sm:flex   text-blue-400 mx-5">
        <svg
          className="my-2 text-xl "
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="white"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
        <input
          className="placeholder-custom-blue placeholder:font-bold focus:outline-none text-2xl   bg-inherit"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="SEARCH"
        />
      </div>
    </header>
  );
};

export default Navbar;
