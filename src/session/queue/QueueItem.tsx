import Song from '../song/Song'
import './QueueItem.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/client';
import { graphql } from '../../gql'
import { QueuedSong, SongVoteDirection, SongVoteAction } from '../../gql/graphql'

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
            return <button className="transparent-button upvoted-for" onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Remove)}>up</button>
        } else {
            return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Add)}>up</button>
        }
    };

    const downVote = () => {
        // TODO: This needs separate increment and decrement functions
        if (showDecrement) {
            if (downVotedFor) {
                return <button className="transparent-button downvoted-for" onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Remove)}>down</button>
            } else {
                return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Add)}>down</button>
            }
        } else {
            return null
        }
    };

    return (
        <div className="queue-item">
            <Song song={queuedSong.simpleSong}></Song>
            <div className='vote'> {queuedSong.votes} </div>
            <div className="voter">
                {upvote()}
                {downVote()}
            </div>
        </div>
    );
}

export default QueueItem;