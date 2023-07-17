import React from 'react'
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../../gql';
import PlaylistItem from './PlaylistItem';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
    isAdmin: boolean
}
function PlaylistPopulate({ sessionID, isAdmin }: PlaylistPopulateProps) {
    const [playlistSearchQuery, { data: playlistSearchQueryData, error: playlistSearchQueryError }] = useLazyQuery(PLAYLIST_SEARCH , {
        variables: {
            sessionID: sessionID
        }
    });

    
    const searchForPlaylists = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        playlistSearchQuery();

    }

    if(playlistSearchQueryError) return <div>Error getting playlists: {playlistSearchQueryError.message}</div>

    if(!playlistSearchQueryData || !playlistSearchQueryData.playlists) {
        return (
            <div className='flex flex-col justify-center items-center h-[92vh]'>
                <Alert className='flex justify-between items-center w-1/2'>
                    <div>
                        <AlertTitle>
                            Queue is empty!
                        </AlertTitle>
                        <AlertDescription>
                            {isAdmin && <p>Populate the queue with songs from a playlist</p>}
                            {!isAdmin && <p>Add songs to the queue with the search bar below</p>}
                        </AlertDescription>
                    </div>
                    {isAdmin && <Button onClick={searchForPlaylists}>Search Playlists</Button>}
                </Alert>
            </div>
        )
    }

    return (
        <div className='playlist-results'>
            {playlistSearchQueryData!.playlists!.map(playlist => (
                <PlaylistItem key={playlist.id} sessionID={sessionID} playlist={playlist} />
            ))}
        </div>
    )
}

export default PlaylistPopulate