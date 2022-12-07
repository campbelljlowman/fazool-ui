import React from 'react'
import Song from '../song/Song'
import './QueueItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useMutation, gql } from '@apollo/client';

const UPDATE_QUEUE = gql`
  mutation UpdateQueue($sessionID: Int!, $song: SongUpdate!) {
    updateQueue(sessionID: $sessionID, song: $song) {
      id
    }
  }
`;

const GET_VOTER = gql`
  query voter ($sessionID: Int!){
    voter (sessionID: $sessionID){
      type
      songsVotedFor
      bonusVotes
    }
  }

`

function QueueItem ({ song, sessionID, showDecrement, votedFor }) {

  const [updateQueue] = useMutation(UPDATE_QUEUE, {
    refetchQueries: [
        {query: GET_VOTER},
        'voter' 
      ]
});

  if(!song){
    return null;
  }

  const addUpvote = () => {
    incrementVote();
  }

  const removeUpvote = () => {
    decrementVote();
  }

  const incrementVote = () => {
    const songData = {
      'id': song.id,
      'vote': 1
  }
  updateQueue({ variables: {sessionID: sessionID, song: songData}});
  };

  const decrementVote = () => {
    const songData = {
      'id': song.id,
      'vote': -1
  }
  updateQueue({ variables: {sessionID: sessionID, song: songData}});
  };

  const upvote = () => {
    if (votedFor) {
      return <button className="transparent-button upvoted-for" onClick={removeUpvote}><FontAwesomeIcon icon={faAngleUp} /></button>
    } else {
      return <button className="transparent-button" onClick={addUpvote}><FontAwesomeIcon icon={faAngleUp} /></button>
    }
  };

  const downVote = () => {
    // TODO: This needs separate increment and decrement functions
    if (showDecrement) {
      if (votedFor) {
        return <button className="transparent-button downvoted-for" onClick={incrementVote}><FontAwesomeIcon icon={faAngleDown} /></button>
      } else {
        return <button className="transparent-button" onClick={decrementVote}><FontAwesomeIcon icon={faAngleDown} /></button>
      }
    } else {
      return null
    }
  };

  return (
    <div className="queue-item">
        <Song song={song}></Song>
        <div className='vote'> {song.votes} </div>
        <div className="voter">
          {upvote()}
          {downVote()}
        </div>
    </div>
  );
}

export default QueueItem;