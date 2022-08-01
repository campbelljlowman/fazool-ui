import React,  { useState } from 'react'

function SearchBox () {
    const [searchValue, setSearchValue] = useState();

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

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