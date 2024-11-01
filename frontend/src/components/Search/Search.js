import React, { useState } from "react";
import searchIcon from "../../assets/icon-search.svg";
import { useDispatch } from "react-redux";
import { setValue } from "../../redux/slices/searchSlice";
import "../Search/Search.css";

function Search({ placeholder }) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [yearValue, setYearValue] = useState("");

  function changeHandler(searchValue, year) {
    dispatch(setValue({ searchValue, year }));
  }

  const handleButtonClick = () => {
    changeHandler(inputValue, yearValue);
    setInputValue("");
    setYearValue("");
  };

  return (
    <div className="search__fieldset">
      <img className="search__icon" src={searchIcon} alt="search-icon" />
      <input
        className="search__input"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={20}
      />
      <input
        className="search__input"
        type="number"
        placeholder="Year"
        value={yearValue}
        onChange={(e) => setYearValue(e.target.value)}
        maxLength={4}
      />
      <button onClick={handleButtonClick} className="button">
        Search
      </button>
    </div>
  );
}

export default Search;
