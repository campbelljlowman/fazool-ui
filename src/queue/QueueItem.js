import React from 'react'
import Song from '../shared-components/Song'
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

function QueueItem ({ song }) {
  const [updateQueue] = useMutation(UPDATE_QUEUE);

  if(!song){
    return null;
  }

  const incrementVote = () => {
    const songData = {
      'id': song.id,
      'vote': 1
  }
  updateQueue({ variables: {sessionID: 81, song: songData}});
  };

  const decrementVote = () => {
    const songData = {
      'id': song.id,
      'vote': -1
  }
  updateQueue({ variables: {sessionID: 81, song: songData}});
  };

  return (
    <div className="queue-item">
        <Song song={song}></Song>
        <div className='vote'> {song.votes} </div>
        <div className="voter">
          <button className="transparent-button" onClick={incrementVote}><FontAwesomeIcon icon={faAngleUp} /></button>
          <button className="transparent-button" onClick={decrementVote}><FontAwesomeIcon icon={faAngleDown} /></button>
        </div>
    </div>
  );
}

export default QueueItem;