import React from "react";

const Card = ({ title, posterPath, genre, year }) => {
  const img_path = "https://image.tmdb.org/t/p/w500";
  // console.log(title)
  return (
    <div className="flex flex-col sm:flex items-center justify-center p-4">
      <img
        loading="lazy"
        className="sm:w-60 w-40  sm:h-96 sm:mb-4"
        src={`${img_path}${posterPath}`}
        alt={title}
      />
      <h3 className="text-blue-500 font-bold py-1">{title}</h3>
      <p className="text-gray-500 font-light text-sm">
        {genre} , {year}
      </p>
    </div>
  );
};

export default Card;
