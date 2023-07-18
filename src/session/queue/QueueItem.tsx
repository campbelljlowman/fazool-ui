import { useMutation } from '@apollo/client';
import { graphql } from '../../gql'
import { QueuedSong, SongVoteDirection, SongVoteAction } from '../../gql/graphql'
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const UPDATE_QUEUE = graphql(`
    mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {
        updateQueue(sessionID: $sessionID, song: $song) {
            numberOfVoters
        }
    }
`)

interface QueueItemProps {
    queuedSong:     QueuedSong,
    sessionID:      number,
    showDecrement:  boolean,
    upVotedFor:     boolean,
    downVotedFor:   boolean
}

function QueueItem({ queuedSong, sessionID, showDecrement, upVotedFor, downVotedFor }: QueueItemProps) {

    const [updateQueueMutation, { error: updateQueueMutationError }] = useMutation(UPDATE_QUEUE, {
        refetchQueries: [
            'voter',
        ]
    });

    if (updateQueueMutationError) {
        console.log("Error updating queue: " + updateQueueMutationError);
    }
    if (!queuedSong) {
        return null;
    }

    const vote = (direction: SongVoteDirection, action: SongVoteAction) => {
        const songData = {
            'id': queuedSong.simpleSong.id,
            'vote': direction,
            'action': action
        }
        updateQueueMutation({ variables: { sessionID: sessionID, song: songData } });
    }


    const upvote = () => {
        if (upVotedFor) {
            return <Button variant={'ghost'} onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Remove)}><ChevronUpCircle className='h-6 w-6 text-orange-400 stroke-orange-400'/></Button>
        } else {
            return <Button variant={'ghost'} onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Add)}><ChevronUpCircle className='h-6 w-6'/></Button>
        }
    };

    const downVote = () => {
        // TODO: This needs separate increment and decrement functions
        if (showDecrement) {
            if (downVotedFor) {
                return <Button variant={'ghost'} onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Remove)}><ChevronDownCircle className='h-6 w-6  text-blue-400 stroke-blue-40'/></Button>
            } else {
                return <Button variant={'ghost'} onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Add)}><ChevronDownCircle className='h-6 w-6'/></Button>
            }
        } else {
            return null
        }
    };

    return (
        <Card className='relative w-5/6 m-4'>
            <CardContent className='p-4 pb-0'>
                <AspectRatio>
                    <img className="h-auto w-full" src={queuedSong.simpleSong.image} alt="Album Cover"  />
                </AspectRatio>
                <p className="font-medium truncate w-full">{queuedSong.simpleSong.title}</p>
                <p className="text-xs text-muted-foreground truncate w-full mb-1">{queuedSong.simpleSong.artist}</p>
                <Badge className='absolute top-3 right-3'>{queuedSong.votes}</Badge>
            </CardContent>
            <CardFooter className="flex justify-around p-2 pt-0">
                    {downVote()}
                    {upvote()}
            </CardFooter>
        </Card>
    );
}

export default QueueItem;