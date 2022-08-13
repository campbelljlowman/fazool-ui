import React from 'react'
import Song from '../shared-components/Song'
import './QueueItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

function QueueItem ({ song }) {
  if(!song){
    return null;
  }

  const incrementVote = () => {
    console.log("Increment Vote");
    song.votes++;
  };

  const decrementVote = () => {
    console.log("Decrement Vote");
    song.votes--;
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