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

function QueueItem ({ queuedSong, sessionID, showDecrement, upVotedFor, downVotedFor }) {

  const [updateQueue, {error: mutationError}] = useMutation(UPDATE_QUEUE, {
    refetchQueries: [
        {query: GET_VOTER},
        'voter' 
      ]
  });

  if(mutationError){
    console.log("Error updating queue: " + mutationError);
  }
  if(!queuedSong){
    return null;
  }

  const vote = (direction, action) => {
    console.log("Voting for song :" + queuedSong.simpleSong);
    const songData = {
      'id': queuedSong.simpleSong.id,
      'vote': direction,
      'action': action
  }
    updateQueue({ variables: {sessionID: sessionID, song: songData}});
  }


  const upvote = () => {
    if (upVotedFor) {
      return <button className="transparent-button upvoted-for" onClick={() => vote("UP", "REMOVE")}><FontAwesomeIcon icon={faAngleUp} /></button>
    } else {
      return <button className="transparent-button" onClick={() => vote("UP", "ADD")}><FontAwesomeIcon icon={faAngleUp} /></button>
    }
  };

  const downVote = () => {
    // TODO: This needs separate increment and decrement functions
    if (showDecrement) {
      if (downVotedFor) {
        return <button className="transparent-button downvoted-for" onClick={() => vote("DOWN", "REMOVE")}><FontAwesomeIcon icon={faAngleDown} /></button>
      } else {
        return <button className="transparent-button" onClick={() => vote("DOWN", "ADD")}><FontAwesomeIcon icon={faAngleDown} /></button>
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