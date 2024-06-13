import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMoviesFetch,
  searchMoviesFetch,
  filterMoviesFetch,
  updateTotalPages,
  updateCurrentPage,
  genreFilter,
} from "./store/movieState";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import Sidemenu from "./components/Sidemenu";
import ReactPaginate from "react-paginate";
import Dropdown from "./components/Dropdown";
import Drop2 from "./components/Drop2";
import Rating from "./components/Rating";
function App() {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const domain = useSelector((state) => state.movies.domain);
  const loading = useSelector((state) => state.movies.isLoading);
  const total_pages = useSelector((state) => state.movies.total_pages);
  const state = useSelector((state) => state.movies);
  console.log(total_pages);
  useEffect(() => {
    dispatch(getMoviesFetch(domain));
  }, [dispatch, domain]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path == "/popular") {
      dispatch(filterMoviesFetch({ domain: domain, filter: "popular" }));
    } else if (path == "/trend") {
      dispatch(
        filterMoviesFetch({ domain: domain, filter: domain == "trending" })
      );
    } else if (path == "/new") {
      dispatch(
        filterMoviesFetch({
          domain: domain,
          filter: domain == "movie" ? "now_playing" : "on_the_air",
        })
      );
    } else if (path == "/top") {
      dispatch(filterMoviesFetch({ domain: domain, filter: "top_rated" }));
    } else {
      dispatch(getMoviesFetch(domain));
    }
  }, []);
  const getGenreNameById = (id) =>
    domain === "movie" ? moiveGenreMap[id] : tvGenreMap[id];

  const [currentPage, setCurrentPage] = useState(0);

  // Callback function for page change
  const handlePageChange = ({ selected }) => {
    console.log(selected);
    dispatch(
      genreFilter({
        domain: state.domain,
        genres: state.genres,
        minYear: state.minYear,
        maxYear: state.maxYear,
        vote_rate: state.vote_rate,
        page: selected,
      })
    );
    setCurrentPage(selected);
  };

  // Calculate start and end index for current page
  const perPage = 20;

  const currentData = movies.slice(1, perPage);
  console.log("new", currentData);

  return (
    <>
      <div className="flex h-auto bg-custom-dark overflow-hidden">
        <div className=" w-ful sm:w-3/4 h-full">
          <Navbar />
          {window.innerWidth < 640 && (
            <div className="mx-20 flex flex-col w-[240px] sm:hidden gap-4">
              <div className="flex text-blue-400 mx-5">
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
                  type="text"
                  placeholder="SEARCH"
                />
              </div>
              <Dropdown />
              <Drop2 />
              <Rating />
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1  sm:grid-cols-3 overflow-scroll gap-4  px-4 md:px-0 ">
              {currentData.length === 0 ? (
                <div className="w-full h-auto my-[324px] mx-[680px]">
                  <h1 className="text-white text-3xl ">No results found</h1>
                </div>
              ) : (
                currentData.map((movie) => (
                  <Card
                    key={movie.id}
                    title={domain === "movie" ? movie.title : movie.name}
                    posterPath={movie.poster_path}
                    genre={getGenreNameById(movie.genre_ids[0])}
                    year={
                      domain === "movie"
                        ? movie.release_date?.slice(0, 4)
                        : movie.first_air_date?.slice(0, 4)
                    }
                  />
                ))
              )}
            </div>
          )}
        </div>
        <div className=" hidden sm:block w-1/4 shadow-2xl">
          <Sidemenu />
        </div>
      </div>
      <div className="hidden sm:flex  justify-center bg-custom-dark text-white">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageRangeDisplayed={5}
          pageCount={total_pages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="px-3 py-2"
          previousClassName="px-3 py-2"
          nextClassName="px-3 py-2"
          breakClassName="px-3 py-2"
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

const moiveGenreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const tvGenreMap = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

export default App;
