import React, { useState } from 'react';
import SearchResults from './SearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'urql';
import './SearchBox.css'
import { graphql } from '../../gql'

const MUSIC_SEARCH = graphql(`
    query musicSearch ($sessionID: Int!, $query: String!){
        musicSearch (sessionID: $sessionID, query: $query){
            id
            title
            artist
            image
        }
    }
`)

interface SearchBoxProps {
    sessionID: number
}

function SearchBox({ sessionID }: SearchBoxProps) {
    // TODO: Component is getting rerendered every time the input changes, which is bad
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // TODO: Maybe use pause to not send query when searchQuery is empty
    let [{data: searchResults, error: searchResultError}, reexecuteMusicSearch] = useQuery({query: MUSIC_SEARCH,
        variables: {
            sessionID: sessionID,
            query: searchQuery
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchQuery(e.target.value);
    }

    const searchForSong = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(searchQuery){
            reexecuteMusicSearch();
        }
        setShowSearchResults(true);
    }

    if (searchResultError) {
        console.log("Error executing search: " + searchResultError)
    }

    const displaySearchResults = () => {
        if (showSearchResults && searchResults) {
            return <SearchResults searchResults={searchResults.musicSearch} clearSearchResults={() => {setShowSearchResults(false)}} />;
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
            {displaySearchResults()}
        </div>
    );
}

export default SearchBox