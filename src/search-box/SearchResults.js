import React from "react";
import Song from '../shared-components/Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import './SearchResult.css'

function SearchResults ({ searchResults }) {

    const addSongToQueue = async (song) => {
        const data = {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'votes': 1,
            'image': song.image
        }

        console.log(song)
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
        const rsp = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/session/81`, requestOptions);
        console.log(rsp);
        if(!rsp.ok){
            console.log(`Request error body: ${await rsp.text()}`);
        }
        // const text = await rsp.text();
        // console.log(text);
    }

    if(!searchResults){
        return null;
    }

    return (
        <div className="search-results">
            {searchResults.map(song => (
                <div className="search-result-item" key={song.id}>
                    <Song song={song} />
                    <button song={song} className="transparent-button" onClick={() => addSongToQueue(song)}><FontAwesomeIcon icon={faPlus}/></button>
                </div>
            ))}  
        </div>  
    );
}

export default SearchResults;