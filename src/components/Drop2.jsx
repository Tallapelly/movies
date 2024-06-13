import React from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { genreFilter } from "../store/movieState";
const GenreDropdown = () => {
  const domain = useSelector((state) => state.movies.domain);
  const minYear = useSelector((state) => state.movies.minYear);
  const maxYear = useSelector((state) => state.movies.maxYear);
  const page = useSelector((state) => state.movies.page);
  const dispatch = useDispatch();
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

  const options = Object.keys(
    domain === "movie" ? moiveGenreMap : tvGenreMap
  ).map((key) => ({
    value: key,
    label: domain === "movie" ? moiveGenreMap[key] : tvGenreMap[key],
  }));
  const handleGenreChange = (selectedOptions) => {
    const selectedGenres = selectedOptions.map((option) => option.value);

    dispatch(
      genreFilter({
        domain: domain,
        genres: selectedGenres,
        minYear: minYear,
        maxYear: maxYear,
        page: page,
      })
    );
  };

  return (
    <Select
      options={options}
      onChange={handleGenreChange}
      placeholder="Select..."
      isMulti
      name="colors"
      className="basic-multi-select"
      classNamePrefix="react-select"
    />
  );
};

export default GenreDropdown;
