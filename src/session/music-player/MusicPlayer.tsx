import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons'
import Song from '../song/Song';
import './MusicPlayer.css'
import QueueHeader from '../queue/QueueHeader';
import { useMutation, } from '@apollo/client';
import { graphql } from '../../gql';
import { CurrentlyPlayingSong, QueueAction } from '../../gql/graphql';


const UPDATE_CURRENTLY_PLAYING = graphql(`
    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {
        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){
            numberOfVoters
        }
    }
`)

interface MusicPlayerProps {
    sessionID:          number,
    currentlyPlaying:   CurrentlyPlayingSong,
    showMediaButtons:   boolean
}

function MusicPlayer({ sessionID, currentlyPlaying, showMediaButtons }: MusicPlayerProps) {
    const [updateCurrentlyPlayingMutation, { error: mutationError }] = useMutation(UPDATE_CURRENTLY_PLAYING)

    const play = () => {
        console.log("Play/Pause");
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Play } })
    };

    const pause = () => {
        console.log("Play/Pause");
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Pause } })
    };

    const advance = () => {
        console.log("Skip to next track");
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Advance } })
    }

    if (mutationError) {
        console.log(`Error! ${mutationError.message}`);
    }
    if (!currentlyPlaying) {
        return null;
    }

    const playPause = () => {
        if (currentlyPlaying.playing === false) {
            return (
                <button className="transparent-button" onClick={play}><FontAwesomeIcon icon={faPlay} /></button>
            )
        } else {
            return (
                <button className="transparent-button" onClick={pause}><FontAwesomeIcon icon={faPause} /></button>
            )
        }
    }

    const mediaButtons = () => {
        if (!showMediaButtons) {
            return null;
        }
        return (
            <div className="media-buttons">
                {playPause()}
                <button className="transparent-button" onClick={advance}><FontAwesomeIcon icon={faForward} /></button>
            </div>
        )
    }

    return (
        <div>
            <div className="music-player" >
                <Song song={currentlyPlaying.simpleSong} />
                {mediaButtons()}
            </div>
            {/*Render this here to allow queue to scroll properly*/}
            <QueueHeader></QueueHeader>
        </div>
    );
}

export default MusicPlayer;