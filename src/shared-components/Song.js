import React from 'react'
import albumCover from '../assets/424958.png';
import './Song.css'

function Song () {
  return (
    <div className="song">            
      <img className="album-cover" src={albumCover} alt="The Jackie Album" width="60" height="60"/>
      <div className="song-info">
          <div className="song-title">The Jackie</div>
          <div className="song-artist">J Cole</div>
      </div>
    </div>
  );
}

export default Song;