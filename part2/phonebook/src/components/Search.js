import React from 'react';

const Search = ({ value, changeFunction }) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={changeFunction}
            />
        </div>
    )
}

export default Search;
