import { graphql } from '../../gql';
import { Playlist } from '../../gql/graphql';
import { useMutation } from '@apollo/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

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
        <Card className='m-4 pt-5'>
            <CardContent>
                <AspectRatio ratio={1}>
                    <img src={playlist.image} alt='playlist cover' /> 
                </AspectRatio>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <p>{playlist.name}</p>
                <Button onClick={populatePlaylist}>Add</Button>
            </CardFooter>
        </Card>
    )
}

export default PlaylistItem