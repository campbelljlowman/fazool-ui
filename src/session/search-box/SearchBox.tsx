import React, { useState } from 'react';
import SearchResults from './SearchResults';
import { useLazyQuery } from '@apollo/client';
import './SearchBox.css';
import { graphql } from '../../gql';
import { ReactComponent as SearchIcon }  from '../../assets/vectors/search-icon.svg'

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

    const searchForSong = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(searchQuery !== "") {
            searchResultQuery();
            setShowSearchResults(true)
        }
    }

    if (searchResultQueryError) {
        console.log("Error executing search: " + searchResultQueryError)
    }

    const clearSearchResults = () => {
        setShowSearchResults(false);
        setSearchQuery("");
    };
    
    const displaySearchResults  = () => {
        if (showSearchResults && searchResultsQueryData) {
            return <SearchResults searchResults={searchResultsQueryData.musicSearch} clearSearchResults={clearSearchResults} />;
        } else {
            return null;
        }
    }

    return (
        <div className='search-box'>
            <form>
                <input className='search-box-input' type="text" placeholder="Song" value={searchQuery} onChange={handleChange} />
                <button className="transparent-button search-icon" onClick={searchForSong}><SearchIcon/></button>
            </form>
            {displaySearchResults()}
        </div>
    );
}

export default SearchBox