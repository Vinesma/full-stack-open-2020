import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './components/List';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearchInput = e => {
        setSearch(e.target.value);
    };

    const handleButton = e => {
        setSearch(e.target.previousSibling.textContent);
    }

    const filteredList = countries.filter(country => {
        return country.name.includes(search);
    });

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            });
    }, []);

    return (
        <div>
            Find country: <input type="text" value={search} onChange={handleSearchInput}/>
            <div>
                <List countries={filteredList} buttonFunction={handleButton}/>
            </div>
        </div>
    )
}

export default App;
