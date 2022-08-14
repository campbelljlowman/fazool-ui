import React from "react";
import Song from '../shared-components/Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import './SearchResult.css'

function SearchResults ({ searchResults }) {
    const addSongToQueue = () => {
        console.log("Add song to queue");
    }
    if(!searchResults){
        return null;
    }

    return (
        <div className="search-results">
            {searchResults.map(song => (
                <div className="search-result-item">
                    <Song key={song.id} song={song} />
                    <button className="transparent-button" onClick={addSongToQueue}><FontAwesomeIcon icon={faPlus}/></button>
                </div>
            ))}  
        </div>  
    );
}

export default SearchResults;