import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { genreFilter } from "../store/movieState";
const YearDropdown = ({ defaultValue, minFlag = false }) => {
  const domain = useSelector((state) => state.movies.domain);
  const minYear = useSelector((state) => state.movies.minYear);
  const maxYear = useSelector((state) => state.movies.maxYear);
  const genres = useSelector((state) => state.movies.genres);
  const page = useSelector((state) => state.movies.page);
  const dispatch = useDispatch();
  const years = Array.from({ length: 2024 - 1990 + 1 }, (_, index) => ({
    value: 1990 + index,
    label: `${1990 + index}`,
  }));

  const handleChange = (value) => {
    const year = value.value;
    console.log(year);
    minFlag
      ? dispatch(
          genreFilter({
            domain: domain,
            genres: genres,
            minYear: year,
            maxYear: maxYear,
            page: page,
          })
        )
      : dispatch(
          genreFilter({
            domain: domain,
            genres: genres,
            minYear: minYear,
            maxYear: year,
            page: page,
          })
        );
  };

  return (
    <Select
      options={years}
      placeholder="Select Year"
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
};

export default YearDropdown;
