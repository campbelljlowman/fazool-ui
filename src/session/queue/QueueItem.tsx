import Song from '../song/Song'
import './QueueItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
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

    const [updateQueue, { error: mutationError }] = useMutation(UPDATE_QUEUE, {
        refetchQueries: [
            'voter',
        ]
    });

    if (mutationError) {
        console.log("Error updating queue: " + mutationError);
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
        console.log("Song data for vote:" + songData);
        console.log("id:" + songData.id);
        console.log("vote:" + songData.vote);
        console.log("action:" + songData.action);
        console.log("session:" + sessionID);
        updateQueue({ variables: { sessionID: sessionID, song: songData } });
    }


    const upvote = () => {
        if (upVotedFor) {
            return <button className="transparent-button upvoted-for" onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Remove)}><FontAwesomeIcon icon={faAngleUp} /></button>
        } else {
            return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Up, SongVoteAction.Add)}><FontAwesomeIcon icon={faAngleUp} /></button>
        }
    };

    const downVote = () => {
        // TODO: This needs separate increment and decrement functions
        if (showDecrement) {
            if (downVotedFor) {
                return <button className="transparent-button downvoted-for" onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Remove)}><FontAwesomeIcon icon={faAngleDown} /></button>
            } else {
                return <button className="transparent-button" onClick={() => vote(SongVoteDirection.Down, SongVoteAction.Add)}><FontAwesomeIcon icon={faAngleDown} /></button>
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