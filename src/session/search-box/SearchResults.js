import React from "react";
import Song from '../song/Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import './SearchResult.css'
import { useMutation, gql } from '@apollo/client';
import { useParams } from "react-router-dom";


const UPDATE_QUEUE = gql`
  mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {
    updateQueue(sessionID: $sessionID, song: $song) {
      id
    }
  }
`;

function SearchResults ({ searchResults, setSearchResults }) {
    const params = useParams();
    const sessionID = params.sessionID;

    const [updateQueue] = useMutation(UPDATE_QUEUE);

    const addSongToQueue = async (song) => {
        const songData = {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'image': song.image,
            'vote': 1
        }

        updateQueue({ variables: {sessionID: sessionID, song: songData}});

        setSearchResults(null);
    }

    if(!searchResults){
        return null;
    }

    return (
        <div className="search-results">
            {searchResults.map(song => (
                <div className="search-result-item" key={song.id}>
                    <Song song={song} />
                    <button className="transparent-button" onClick={() => addSongToQueue(song)}><FontAwesomeIcon icon={faPlus}/></button>
                </div>
            ))}  
        </div>  
    );
}

export default SearchResults;