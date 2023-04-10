import React from "react";
import Song from '../song/Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './SearchResult.css'
import { useMutation, gql } from '@apollo/client';
import { useParams } from "react-router-dom";


const UPDATE_QUEUE = gql`
  mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {
    updateQueue(sessionID: $sessionID, song: $song) {
      numberOfVoters
    }
  }
`;


function SearchResults({ searchResults, setSearchResults }) {
    const params = useParams();
    const sessionID = params.sessionID;

    const [updateQueue, { error: updateError }] = useMutation(UPDATE_QUEUE, {
        refetchQueries: [
            'voter',
        ]
    });

    const addSongToQueue = (song) => {
        const songData = {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'image': song.image,
            'vote': 'UP',
            'action': 'ADD'
        }

        updateQueue({ variables: { sessionID: sessionID, song: songData } });
        setSearchResults(null);
    }

    if (updateError) {
        console.log("Error updating session: " + updateError);
    }
    if (!searchResults) {
        return null;
    }

    return (
        <div className="search-results">
            {searchResults.map(song => (
                <div className="search-result-item" key={song.id}>
                    <Song song={song} />
                    <button className="transparent-button" onClick={() => addSongToQueue(song)}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;