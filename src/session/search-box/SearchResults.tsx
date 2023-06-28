import Song from '../song/Song';
import './SearchResult.css';
import { useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import { graphql } from '../../gql';
import { SimpleSong, SongUpdate, SongVoteAction, SongVoteDirection } from '../../gql/graphql';
import { ReactComponent as PlusIcon }  from '../../assets/vectors/plus-icon.svg'


const UPDATE_QUEUE = graphql(`
    mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {
        updateQueue(sessionID: $sessionID, song: $song) {
            numberOfVoters
        }
    }
`);

interface SearchResultProps {
    searchResults: SimpleSong[] | null | undefined,
    clearSearchResults: () => void
};

function SearchResults({ searchResults, clearSearchResults }: SearchResultProps) {
    const params = useParams();
    const sessionID = parseInt(params.sessionID!)

    const [updateQueueMutation, { error: updateQueueMutationError }] = useMutation(UPDATE_QUEUE, {
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

        updateQueueMutation({ variables: { sessionID: sessionID, song: songData } });
        clearSearchResults();
    }

    if (updateQueueMutationError) {
        console.log("Error updating session: " + updateQueueMutationError);
    }
    if (!searchResults) {
        return null;
    }

    return (
        <div className="search-results">
            {searchResults.map(song => (
                <div className="search-result-item" key={song.id}>
                    <div className='search-result-item-song'>
                        <Song song={song}/>
                    </div>
                    <button className="transparent-button svg-wrapper" onClick={() => addSongToQueue(song)}><PlusIcon/></button>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;