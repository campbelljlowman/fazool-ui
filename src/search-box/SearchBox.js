import React,  { useState, useEffect } from 'react'

function SearchBox () {
    const [searchValue, setSearchValue] = useState();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const getClientToken = () => {
        console.log("Getting client token");
    }

    useEffect(getClientToken, []);

    // Create funciton to get spotify client access token
    // On startup, check for access token in local storage
    // If no token, use function to get token, store in local storage and state
    // If token in localstorage, check it's valid. If not, refresh

    return(
        <form>
            {/* <label>
                Song:
            </label> */}
            <input type="text" placeholder="Song" value={searchValue} onChange={handleChange} /> 
        </form>
    );
}

export default SearchBox