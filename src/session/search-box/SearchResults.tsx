import SearchResultSong from './SearchResultSong';
import { useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import { graphql } from '../../gql';
import { SimpleSong, SongUpdate, SongVoteAction, SongVoteDirection } from '../../gql/graphql';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
        <Card className='absolute bottom-[10vh] md:left-1/3 left-[10%] md:w-1/3 w-5/6'>
            <CardHeader className='pb-2'>
                <CardTitle className='flex justify-between items-center'>
                    <p>Search Results</p>
                    <Button variant={'ghost'} onClick={clearSearchResults}><XCircle className='h-6 w-6'/></Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
            {searchResults.slice(0).map(song => (
                <>
                    <Separator/>
                    <div className="flex items-center justify-between w-full py-2" key={song.id}>
                        <div className='w-3/4'>
                            <SearchResultSong song={song}/>
                        </div>
                        <Button variant={"ghost"} onClick={() => addSongToQueue(song)}><PlusCircle className='h-6 w-6'/></Button>
                    </div>
                </>
            ))}
            </CardContent>
        </Card>
    );
}

export default SearchResults;