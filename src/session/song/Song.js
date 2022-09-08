import React from 'react'
import './Song.css'

function Song ({ song }) {
  if(!song){
    return null;
  }
  
  return (
    <div className="song">            
      <img className="album-cover" src={song.image} alt="Album Cover" width="60" height="60"/>
      <div className="song-info">
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
      </div>
    </div>
  );
}

export default Song;