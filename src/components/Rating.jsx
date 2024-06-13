import React from "react";

import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { genreFilter } from "../store/movieState";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";

const Rating = () => {
  // const domain = useSelector(state => state.movies.domain);
  // const minYear = useSelector(state=>state.movies.minYear);
  // const maxYear=useSelector(state=>state.movies.maxYear);
  // const genres = useSelector(state=>state.movies.genres);
  const state = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  const ratingChanged = (value) => {
    dispatch(
      genreFilter({
        domain: state.domain,
        genres: state.genres,
        minYear: state.minYear,
        maxYear: state.maxYear,
        vote_rate: value,
        page:state.page
      })
    );
  };
  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
  );
};

export default Rating;
