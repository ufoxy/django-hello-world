import React, { useState } from 'react';
import '../Search/Search.css';
import searchIcon from '../../assets/icon-search.svg';
import { useDispatch } from 'react-redux';
import { setValue } from "../../redux/slices/searchSlice";

function Search({ placeholder }) {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [yearValue, setYearValue] = useState(''); // Estado para o ano

    function changeHandler(searchValue, year) {
        dispatch(setValue({ searchValue, year })); // Envia um objeto com ambos os valores
    }

    const handleButtonClick = () => {
        changeHandler(inputValue, yearValue); // Envia o valor do input e do ano
        setInputValue(''); // Limpa o input de busca
        setYearValue(''); // Limpa o input do ano
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
                placeholder="Ano"
                value={yearValue}
                onChange={(e) => setYearValue(e.target.value)}
                maxLength={4}
            />
            <button onClick={handleButtonClick}>Enviar</button>
        </div>
    );
}

export default Search;