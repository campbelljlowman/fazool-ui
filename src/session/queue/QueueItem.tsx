import Song from '../song/Song'
import './QueueItem.css'
import { useMutation } from '@apollo/client';
import { graphql } from '../../gql'
import { QueuedSong, SongVoteDirection, SongVoteAction } from '../../gql/graphql'
import { ReactComponent as UpvoteIcon }  from '../../assets/vectors/upvote-icon.svg'
import { ReactComponent as DownvoteIcon }  from '../../assets/vectors/downvote-icon.svg'


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
        console.log("Voting for song :" + queuedSong.simpleSong);
        const songData = {
            'id': queuedSong.simpleSong.id,
            'vote': direction,
            'action': action
        }
        updateQueueMutation({ variables: { sessionID: sessionID, song: songData } });
    }


    const upvote = () => {
        if (upVotedFor) {
            return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Remove)}><UpvoteIcon color='orange'/></button>
        } else {
            return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Add)}><UpvoteIcon/></button>
        }
    };

    const downVote = () => {
        // TODO: This needs separate increment and decrement functions
        if (showDecrement) {
            if (downVotedFor) {
                return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Remove)}><DownvoteIcon color='blue'/></button>
            } else {
                return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Add)}><DownvoteIcon/></button>
            }
        } else {
            return null
        }
    };

    return (
        <div className="queue-item">
            <img className="queue-item-album-cover" src={queuedSong.simpleSong.image} alt="Album Cover"  />
            <div className="queue-item-song-title">{queuedSong.simpleSong.title}</div>
            <div className="queue-item-song-artist">{queuedSong.simpleSong.artist}</div>
            <div className='votes'>{queuedSong.votes}</div>
            <div className="vote-buttons">
                {downVote()}
                {upvote()}
            </div>
        </div>
    );
}

export default QueueItem;