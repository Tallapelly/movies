import React, { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const options = [
  { value: '/popular', label: 'Popular' },
  { value: '/trend', label: 'Trend' },
  { value: '/new', label: 'Newest' },
  { value: '/top', label: 'Top rated' }
];
const Drop3 = ({  }) => {

//   const [selectedOption, setSelectedOption] = useState(options[0]);

//   const handleChange = selectedOption => {
//     setSelectedOption(selectedOption);
//     handleClick(selectedOption.value);
//   };

  return (
    <Select
      options={options}
    //   value={selectedOption}
    //   onChange={handleChange}
      className="text-xl"
      styles={{
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#3B82F6' : 'white',
          color: state.isSelected ? 'white' : '#3B82F6',
          '&:hover': {
            backgroundColor: '#f0f2f5',
            color: '#3B82F6'
          }
        })
      }}
    //   isOptionSelected={(option) => option.value === activeLink}
    //   getOptionLabel={(option) => (
    //     <Link to={option.value} className="text-xl font-black mx-4 hover:text-blue-500">
    //       {option.label}
    //     </Link>
    //   )}
    />
  );
};

export default Drop3;
