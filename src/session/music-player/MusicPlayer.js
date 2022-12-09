import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons'
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

function MusicPlayer ({ session, showMediaButtons }) {
  const [updateCurrentlyPlayingMutation, { error: mutationError }] = useMutation(UPDATE_CURRENTLY_PLAYING)

  const play = () => {
    console.log("Play/Pause");
    updateCurrentlyPlayingMutation({variables: {sessionID: session.id, action: "PLAY"}})
  };

  const pause = () => {
    console.log("Play/Pause");
    updateCurrentlyPlayingMutation({variables: {sessionID: session.id, action: "PAUSE"}})
  };

  const advance = () => {
    console.log("Skip to next track");
    updateCurrentlyPlayingMutation({variables: {sessionID: session.id, action: "ADVANCE"}})
  }

  if (mutationError) return `Error! ${mutationError.message}`;
  if(!session.currentlyPlaying){
    return null;
  }

  const playPause = () => {
    if (session.currentlyPlaying.playing === false) {
      return(
        <button className="transparent-button" onClick={play}><FontAwesomeIcon icon={faPlay}/></button>
      )
    } else {
      return (
        <button className="transparent-button" onClick={pause}><FontAwesomeIcon icon={faPause}/></button>
      )
    }
  }

  return (
    <div>
      <div className="music-player" >
          <Song song={session.currentlyPlaying} />
          <div className="media-buttons">
              {playPause()}
              <button className="transparent-button" onClick={advance}><FontAwesomeIcon icon={faForward}/></button>
          </div>
      </div>
      {/*Render this here to allow queue to scroll properly*/}
      <QueueHeader></QueueHeader>
    </div>
  );
}

export default MusicPlayer;