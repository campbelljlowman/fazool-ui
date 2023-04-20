import React, { useState } from 'react';
import SearchResults from './SearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useLazyQuery } from '@apollo/client';
import './SearchBox.css';
import { graphql } from '../../gql';

const MUSIC_SEARCH  = graphql(`
    query musicSearch ($sessionID: Int!, $query: String!){
        musicSearch (sessionID: $sessionID, query: $query){
            id
            title
            artist
            image
        }
    }
`);

interface SearchBoxProps {
    sessionID: number
};

function SearchBox({ sessionID }: SearchBoxProps) {
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [searchResultQuery, { data: searchResultsQueryData, error: searchResultQueryError }] = useLazyQuery(MUSIC_SEARCH , {
        variables: {
            sessionID: sessionID,
            query: searchQuery
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchQuery(e.target.value);
    }

    const searchForSong = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        searchResultQuery();
        setShowSearchResults(true)
    }

    if (searchResultQueryError) {
        console.log("Error executing search: " + searchResultQueryError)
    }

    const displaySearchResults  = () => {
        if (showSearchResults && searchResultsQueryData) {
            return <SearchResults searchResults={searchResultsQueryData.musicSearch} clearSearchResults={() => {setShowSearchResults(false)}} />;
        } else {
            return null;
        }
    }

    return (
        <div className='search-box'>
            <form>
                <input className='search-box-input' type="text" placeholder="Song" value={searchQuery} onChange={handleChange} />
                <button className="transparent-button" onClick={searchForSong}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
            {displaySearchResults ()}
        </div>
    );
}

export default SearchBox