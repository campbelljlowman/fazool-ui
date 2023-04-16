import Song from '../song/Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './SearchResult.css'
import { useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import { graphql } from '../../gql'
import { MusicSearchQuery, SimpleSong, SongUpdate, SongVoteAction, SongVoteDirection } from '../../gql/graphql';


const UPDATE_QUEUE = graphql(`
    mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {
        updateQueue(sessionID: $sessionID, song: $song) {
        numberOfVoters
        }
    }
`)

interface SearchResultProps {
    searchResults: SimpleSong[] | null | undefined,
    setSearchResults: React.Dispatch<React.SetStateAction<MusicSearchQuery | undefined>>
}

function SearchResults({ searchResults, setSearchResults }: SearchResultProps) {
    const params = useParams();
    const sessionID = parseInt(params.sessionID!)

    const [updateQueue, { error: updateError }] = useMutation(UPDATE_QUEUE, {
        refetchQueries: [
            'voter',
        ]
    });

    const addSongToQueue = (song: SimpleSong) => {
        const songData: SongUpdate = {
            'id': song.id,
            'title': song.title,
            'artist': song.artist,
            'image': song.image,
            'vote': SongVoteDirection.Up,
            'action': SongVoteAction.Add
        }

        updateQueue({ variables: { sessionID: sessionID, song: songData } });
        setSearchResults(undefined);
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