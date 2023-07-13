import { graphql } from '../../gql';
import { useMutation, } from '@apollo/client';
import { QueueAction } from '../../gql/graphql';
import { Settings, Play, Pause, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';


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
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Play } });
    };

    const pause = () => {
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Pause } });
    };

    const advance = () => {
        updateCurrentlyPlayingMutation({ variables: { sessionID: sessionID, action: QueueAction.Advance } });
    }

    const endSession = () => {
        endSessionMutation({ variables: {sessionID: sessionID } });
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
                <Button onClick={pause} variant={'ghost'} size={'icon'}><Pause className='h-8 w-8'/></Button>
                )
        } else {
            return (
                <Button onClick={play} variant={'ghost'} size={'icon'}><Play className='h-8 w-8'/></Button>
            )
        }
    }

    return (
        <div className=''>
            <Button onClick={endSession} variant={'ghost'} size={'icon'}><Settings className='h-8 w-8'/></Button>
            {playPause(currentlyPlaying)}
            <Button onClick={advance} variant={'ghost'} size={'icon'}><SkipForward className='h-8 w-8'/></Button>
        </div>
    )
}

export default MediaButtons