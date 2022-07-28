import React from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faForward } from '@fortawesome/free-solid-svg-icons'
import Song from '../shared-components/Song';
import './MusicPlayer.css'

function MusicPlayer () {
  return (
      <div className="music-player" >
          <Song></Song>
          <div className="media-buttons">
              <Button variant="outline-dark" className="play-pause-button"><FontAwesomeIcon icon={faPlay} /></Button>
              <Button variant="outline-dark" className="advance-button"><FontAwesomeIcon icon={faForward} /></Button>
          </div>
      </div>
  );
}

export default MusicPlayer;