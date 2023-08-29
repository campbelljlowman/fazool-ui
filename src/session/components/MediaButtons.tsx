import { graphql } from '../../gql';
import { useMutation, } from '@apollo/client';
import { QueueAction } from '../../gql/graphql';
import { Settings, Play, Pause, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { DialogClose } from '@radix-ui/react-dialog';
import { ButtonStyledP } from '@/components/ui/button-styled-p';


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
        location.reload()
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
        <div>
            <Dialog>
                <DialogTrigger>
                    <ButtonStyledP variant={'ghost'} size={'icon'}><Settings className='h-8 w-8'/></ButtonStyledP>
                </DialogTrigger>
                <DialogContent className='flex flex-col items-center'>
                    <DialogHeader>
                        <DialogTitle>
                            Session Settings
                        </DialogTitle>
                    </DialogHeader>
                    <Separator/>
                    <DialogClose onClick={endSession}>
                        <ButtonStyledP variant={'destructive'}>End Session</ButtonStyledP>
                    </DialogClose>
                </DialogContent>
            </Dialog>
            {playPause(currentlyPlaying)}
            <Button onClick={advance} variant={'ghost'} size={'icon'}><SkipForward className='h-8 w-8'/></Button>
        </div>
    )
}

export default MediaButtons