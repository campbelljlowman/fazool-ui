import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faForward } from '@fortawesome/free-solid-svg-icons'
import Song from '../shared-components/Song';
import './MusicPlayer.css'
import QueueHeader from '../queue/QueueHeader';

function MusicPlayer () {
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);

  useEffect (() => {
    const fetchSong = async () => {
      const rsp = await fetch ("/song.json");
      const song = await rsp.json();
      setCurrentlyPlaying(song);
    };
    fetchSong().catch(console.error);
  }, []);

  const playPause = () => {
    console.log("Play/Pause");
  };

  const advance = () => {
    console.log("Skip to next track");
  }

  return (
    <div>
      <div className="music-player" >
          <Song song={currentlyPlaying} />
          <div className="media-buttons">
              <Button variant="outline-dark" className="play-pause-button" onClick={playPause}><FontAwesomeIcon icon={faPlay}/></Button>
              <Button variant="outline-dark" className="advance-button" onClick={advance}><FontAwesomeIcon icon={faForward} /></Button>
          </div>
      </div>
      {/*Render this here to allow queue to scroll properly*/}
      <QueueHeader></QueueHeader>
    </div>
  );
}

export default MusicPlayer;