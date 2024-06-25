import { useState } from 'react';
import './Search.css';
import useDebounce from '../../hooks/useDebounce';

function Search({updateSearchTerm}){ //prop from pokedex.jsx
    const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value)); //for delayed input of 2sec(2000)
    return(
        <div className="search-wrapper">
            <input 
                id='pokemon-name-search'
                type="text" 
                placeholder="Pokemon Name..."
                onChange={debouncedCallback}
            />
            
        </div>
    );
}

export default Search;