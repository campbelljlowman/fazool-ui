import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faForward } from '@fortawesome/free-solid-svg-icons'
import Song from './Song';
import './MusicPlayer.css'

export default class MusicPlayer extends PureComponent {
  render() {
    return (
        <div class="music-player" >
            <Song></Song>
            <div class="media-buttons">
                <Button variant="outline-dark" className="play-pause-button"><FontAwesomeIcon icon={faPlay} /></Button>
                <Button variant="outline-dark" className="advance-button"><FontAwesomeIcon icon={faForward} /></Button>
            </div>
        </div>
    )
  }
}
