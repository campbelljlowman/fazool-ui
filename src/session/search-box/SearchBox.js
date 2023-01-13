import React, { useState } from 'react';
// import {Buffer} from 'buffer';
import SearchResults from './SearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { gql, useLazyQuery } from '@apollo/client';
import './SearchBox.css'

const EXECUTE_SEARCH = gql`
    query musicSearch ($sessionID: Int!, $query: String!){
        musicSearch (sessionID: $sessionID, query: $query){
            id
            title
            artist
            image
        }
    }
`

function SearchBox({ refetchVoter, sessionID }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState();

    const [searchResultQuery, { error: searchResultError }] = useLazyQuery(EXECUTE_SEARCH, {
        variables: {
            sessionID: sessionID,
            query: searchValue
        },
        onCompleted(searchResults) {
            console.log("Search Results: ", searchResults);
            setSearchResults(searchResults);
        }
    });

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const searchForSong = async (e) => {
        e.preventDefault();
        searchResultQuery();
    }

    if (searchResultError) {
        console.log("Error executing search: " + searchResultError)
    }

    const showSearchResults = () => {
        if (searchResults) {
            return <SearchResults searchResults={searchResults.musicSearch} setSearchResults={setSearchResults} refetchVoter={refetchVoter} />;
        } else {
            return null;
        }
    }

    return (
        <div className='search-box'>
            <form>
                <input className='search-box-input' type="text" placeholder="Song" value={searchValue} onChange={handleChange} />
                <button className="transparent-button" onClick={searchForSong}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
            {showSearchResults()}
        </div>
    );
}

export default SearchBox