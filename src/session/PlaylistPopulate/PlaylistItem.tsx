import { graphql } from '../../gql';
import { Playlist } from '../../gql/graphql';
import './PlaylistItem.css'
import { useMutation } from '@apollo/client';

const SET_PLAYLIST = graphql(`
    mutation setPlaylist($sessionID: Int!, $playlistID: String!) {
        setPlaylist (sessionID: $sessionID, playlistID: $playlistID) {
            numberOfVoters
        }
    }
`);

interface PlaylistItmeProps {
    sessionID: number,
    playlist: Playlist
}
function PlaylistItem({ sessionID, playlist }: PlaylistItmeProps) {

    const [setPlaylistMutation, { error: setPlaylistMutationError }] = useMutation(SET_PLAYLIST, {
        variables: {
            sessionID: sessionID,
            playlistID: playlist.id
        },
    });

    const populatePlaylist = () => {
        setPlaylistMutation();
    }

    if(setPlaylistMutationError) {
        console.log(`Error setting playlist: ${setPlaylistMutationError.message}`);
    }
    return (
        <div className='playlist-item' onClick={populatePlaylist}>
            <img className='playlist-cover' src={playlist.image} alt='playlist cover' />
            <div>{playlist.name}</div>
        </div>
    )
}

export default PlaylistItem