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

const END_SESSION = graphql(`
    mutation endSession($sessionID: Int!){
        endSession(sessionID: $sessionID)
    }
`)

interface MediaButtonsProps {
    showMediaButtons: boolean
    currentlyPlaying: boolean
    sessionID: number
}
function MediaButtons ({showMediaButtons, currentlyPlaying, sessionID}: MediaButtonsProps) {
    const [updateCurrentlyPlayingMutation, { error: updateCurrentlyPlayingMutationError }] = useMutation(UPDATE_CURRENTLY_PLAYING)
    const [endSessionMutation, { error: endSessionMutationError }] = useMutation(END_SESSION)

    const play = () => {
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Play } })
    };

    const pause = () => {
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Pause } })
    };

    const advance = () => {
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Advance } })
    }

    if (!showMediaButtons) {
        return null;
    }

    if (updateCurrentlyPlayingMutationError) {
        console.log(`Error! ${updateCurrentlyPlayingMutationError.message}`);
    }

    if (endSessionMutationError) {
        console.log(`Error! ${endSessionMutationError.message}`);
    }

    const playPause = (playing: boolean) => {
        if (playing) {
            return (
                <button className="transparent-button svg-wrapper" onClick={pause}><PauseIcon/></button>
                )
        } else {
            return (
                <button className="transparent-button svg-wrapper" onClick={play}><PlayIcon/></button>
            )
        }
    }

    return (
        <div className="media-buttons">
            <button className='transparent-button svg-wrapper' onClick={() => {endSessionMutation({ variables: {sessionID: sessionID}})}}><SettingsIcon/></button>
            {playPause(currentlyPlaying)}
            <button className="transparent-button svg-wrapper" onClick={advance}><SkipIcon/></button>
        </div>
    )
}

export default MediaButtons