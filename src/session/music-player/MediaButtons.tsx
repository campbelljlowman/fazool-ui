import { graphql } from '../../gql';
import { useMutation, } from '@apollo/client';
import { QueueAction } from '../../gql/graphql';
import './MediaButtons.css'
import { ReactComponent as PauseIcon }  from '../../assets/vectors/pause-icon.svg'
import { ReactComponent as PlayIcon }  from '../../assets/vectors/play-icon.svg'
import { ReactComponent as SkipIcon }  from '../../assets/vectors/skip-icon.svg'
import { ReactComponent as SettingsIcon }  from '../../assets/vectors/settings-icon.svg'


const UPDATE_CURRENTLY_PLAYING = graphql(`
    mutation updateCurrentlyPlaying ($sessionID: Int!, $action: QueueAction!) {
        updateCurrentlyPlaying(sessionID:$sessionID, action:$action){
            numberOfVoters
        }
    }
`)

interface MediaButtonsProps {
    showMediaButtons: boolean
    currentlyPlaying: boolean
    sessionID: number
}
function MediaButtons ({showMediaButtons, currentlyPlaying, sessionID}: MediaButtonsProps) {
    const [updateCurrentlyPlayingMutation, { error: updateCurrentlyPlayingMutationError }] = useMutation(UPDATE_CURRENTLY_PLAYING)

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

    if (!showMediaButtons) {
        return null;
    }

    if (updateCurrentlyPlayingMutationError) {
        console.log(`Error! ${updateCurrentlyPlayingMutationError.message}`);
    }

    const playPause = (playing: boolean) => {
        if (playing) {
            return (
                <button className="transparent-button" onClick={pause}><PauseIcon/></button>
                )
        } else {
            return (
                <button className="transparent-button" onClick={play}><PlayIcon/></button>
            )
        }
    }

    return (
        <div className="media-buttons">
            <button className='transparent-button'><SettingsIcon/></button>
            {playPause(currentlyPlaying)}
            <button className="transparent-button" onClick={advance}><SkipIcon/></button>
        </div>
    )
}

export default MediaButtons