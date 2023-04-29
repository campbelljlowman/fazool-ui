import React from 'react'
import './PlaylistPopulate.css'
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../../gql';
import PlaylistItem from './PlaylistItem';

const PLAYLIST_SEARCH  = graphql(`
    query playlists ($sessionID: Int!){
        playlists (sessionID: $sessionID){
            id
            name
            image
        }
    }
`);

interface PlaylistPopulateProps {
    sessionID: number
}
function PlaylistPopulate({ sessionID }: PlaylistPopulateProps) {
    const [playlistSearchQuery, { data: playlistSearchQueryData, error: playlistSearchQueryError }] = useLazyQuery(PLAYLIST_SEARCH , {
        variables: {
            sessionID: sessionID
        },
    });

    
    const searchForPlaylists = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        playlistSearchQuery();

    }

    if(playlistSearchQueryError) return <div>Error getting playlists: {playlistSearchQueryError.message}</div>

    if(!playlistSearchQueryData || !playlistSearchQueryData.playlists) {
        return (
            <div className='playlist-populate'>
                <div>Looks like your queue is empty</div>
                <div>Want to add some songs from a playlist?</div>
                <button onClick={searchForPlaylists}>Search</button>
            </div>
        )
    }

    return (
        <>
            <div>Playlists:</div>
            {playlistSearchQueryData!.playlists!.map(playlist => (
                <PlaylistItem key={playlist.id} image={playlist.name} name={playlist.name} />
            ))}
        </>
    )
}

export default PlaylistPopulate