import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getMoviesFetch } from "../store/movieState";

const options = [
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
];

const Dropdown = () => {
  const dispatch = useDispatch();

  const handleDomainChange = (selectedOption) => {
    dispatch(getMoviesFetch(selectedOption.value));
  };

  return (
    <Select
      options={options}
      onChange={handleDomainChange}
      defaultValue={options[0]} // Set default value to 'Movies'
    />
  );
};

export default Dropdown;
