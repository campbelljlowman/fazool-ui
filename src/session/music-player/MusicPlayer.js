import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faForward } from '@fortawesome/free-solid-svg-icons'
import Song from '../song/Song';
import './MusicPlayer.css'
import QueueHeader from '../queue/QueueHeader';
import { useMutation, gql } from '@apollo/client';


const UPDATE_CURRENTLY_PLAYING = gql`
mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {
    updateCurrentlyPlaying(sessionID:$sessionID, action:$action){
        id
    }
  }
`

function MusicPlayer ({ session }) {
  const [updateCurrentlyPlayingMutation, { mutationError }] = useMutation(UPDATE_CURRENTLY_PLAYING)

  const playPause = () => {
    console.log("Play/Pause");
    updateCurrentlyPlayingMutation({variables: {sessionID: session.id, action: "PLAY"}})
  };

  const advance = () => {
    console.log("Skip to next track");
    updateCurrentlyPlayingMutation({variables: {sessionID: session.id, action: "ADVANCE"}})
  }

  if (mutationError) return `Error! ${mutationError.message}`;
  if(!session.currentlyPlaying){
    return null;
  }

  return (
    <div>
      <div className="music-player" >
          <Song song={session.currentlyPlaying} />
          <div className="media-buttons">
              <button className="transparent-button" onClick={playPause}><FontAwesomeIcon icon={faPlay}/></button>
              <button className="transparent-button" onClick={advance}><FontAwesomeIcon icon={faForward}/></button>
          </div>
      </div>
      {/*Render this here to allow queue to scroll properly*/}
      <QueueHeader></QueueHeader>
    </div>
  );
}

export default MusicPlayer;