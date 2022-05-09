import React, { PureComponent } from 'react'
import albumCover from './dev_assets/the_jackie.png';
import './Song.css'

export default class Song extends PureComponent {
  render() {
    return (
      <div class="song">            
        <img class="album-cover" src={albumCover} alt="The Jackie Album" width="60" height="60"/>
        <div class="song-info">
            <div class="song-title">The Jackie</div>
            <div class="song-artist">J Cole</div>
        </div>
      </div>
    )
  }
}
