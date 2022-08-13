import React from 'react'
import './QueueHeader.css'

function QueueHeader () {
  return (
    <div className='queue-header'>
      <div className='song-header'>Song</div>
      <div className='votes-header'>Votes</div>
    </div>
  );
}

export default QueueHeader;