import React, { useState } from 'react';
import '../Search/Search.css';
import searchIcon from '../../assets/icon-search.svg';
import { useDispatch } from 'react-redux';
import { setValue } from "../../redux/slices/searchSlice";

function Search({ placeholder }) {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    function changeHandler(value) {
        dispatch(setValue(value));
    }

    const handleButtonClick = () => {
        changeHandler(inputValue);
        setInputValue(''); // Limpa o input após o envio, se desejado
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
            <button onClick={handleButtonClick}>Enviar</button>
        </div>
    );
}

export default Search;