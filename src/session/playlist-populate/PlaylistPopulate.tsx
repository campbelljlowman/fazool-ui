import React from 'react'
import './PlaylistPopulate.css'
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../../gql';
import PlaylistItem from './PlaylistItem';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';

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
        // if (isAdmin) {
        return (
            <div className='flex flex-col justify-center items-center h-[92vh]'>
                <Card className='flex flex-col w-1/4 items-center'>
                    <CardHeader>
                        <CardTitle>Queue is empty</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        <p>Add songs to the queue with the search bar below</p>
                        {isAdmin && <p>Or you can populate the queue with songs from a playlist</p>}
                    </CardContent>
                    {isAdmin && <CardFooter>
                        <Button onClick={searchForPlaylists}>Search Playlists</Button>
                    </CardFooter>}
                </Card>
            </div>
        )
        // } else {
        //     return (
        //         <div className='empty-queue-message'>Looks like the queue is empty. Add songs with the search bar</div>
        //     )
        // }
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