import React from 'react';
import Weather from './Weather';

const List = ({ countries, buttonFunction }) => {
    if (countries.length > 11) {
        return (
            <div>
                <p>Too many matches, please be more specific.</p>
            </div>
        )
    } else if (countries.length > 1) {
        return (
            <div>
                {
                    countries.map(country => {
                        return (
                            <div key={country.numericCode}>
                                <p>{country.name}</p>
                                <button onClick={buttonFunction}>Select</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                <h2>{countries[0].name}</h2>
                <p>Capital: {countries[0].capital}</p>
                <p>Population: {countries[0].population}</p>
                <h4>Languages</h4>
                <ul>
                    {countries[0].languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
                </ul>
                <img src={countries[0].flag} alt={`Flag of ${countries[0].name}`}/>
                <Weather country={countries[0].name} />
            </div>
        )
    } else {
        return (
        <div>
            <p>Nothing found.</p>
        </div>
        )
    }
}

export default List;
