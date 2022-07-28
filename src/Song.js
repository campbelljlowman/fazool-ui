import React, { PureComponent } from 'react'
import albumCover from './assets/424958.png';
import './Song.css'

export default class Song extends PureComponent {
  render() {
    return (
      <div className="song">            
        <img className="album-cover" src={albumCover} alt="The Jackie Album" width="60" height="60"/>
        <div className="song-info">
            <div className="song-title">The Jackie</div>
            <div className="song-artist">J Cole</div>
        </div>
      </div>
    )
  }
}
