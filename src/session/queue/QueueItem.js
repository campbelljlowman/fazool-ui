import React, { useState } from 'react'
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

function QueueItem ({ song, sessionID, showDecrement, initialVotedFor }) {

  const [upVotedFor, setUpVotedFor] = useState(initialVotedFor);
  const [downVotedFor, setDownVotedFor] = useState(initialVotedFor);
  const [updateQueue] = useMutation(UPDATE_QUEUE);

  if(!song){
    return null;
  }

  const addUpvote = () => {
    incrementVote();
    setUpVotedFor(true);
  }

  const removeUpvote = () => {
    decrementVote();
    setUpVotedFor(false);
  }

  const incrementVote = () => {
    const songData = {
      'id': song.id,
      'vote': 1
  }
  updateQueue({ variables: {sessionID: sessionID, song: songData}});
  setUpVotedFor(true);
  setDownVotedFor(false);
  };

  const decrementVote = () => {
    const songData = {
      'id': song.id,
      'vote': -1
  }
  updateQueue({ variables: {sessionID: sessionID, song: songData}});
  setUpVotedFor(false);
  setDownVotedFor(true);
  };

  const upvote = () => {
    if (upVotedFor) {
      return <button className="transparent-button upvoted-for" onClick={removeUpvote}><FontAwesomeIcon icon={faAngleUp} /></button>
    } else {
      return <button className="transparent-button" onClick={addUpvote}><FontAwesomeIcon icon={faAngleUp} /></button>
    }
  };

  const downVote = () => {
    // TODO: This needs separate increment and decrement functions
    console.log("Show decrement" + showDecrement);
    if (showDecrement) {
      if (downVotedFor) {
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