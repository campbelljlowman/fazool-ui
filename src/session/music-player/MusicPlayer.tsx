import Song from './CurrentlyPlayingSong';
import MediaButtons from './MediaButtons'
import { CurrentlyPlayingSong } from '../../gql/graphql';
import ProgressBar from './ProgressBar';



interface MusicPlayerProps {
    sessionID:          number,
    currentlyPlaying:   CurrentlyPlayingSong | null | undefined,
    isAdmin:            boolean
    streamingService:   string | null | undefined
}

function MusicPlayer({ sessionID, currentlyPlaying, isAdmin, streamingService }: MusicPlayerProps) {

    if (!currentlyPlaying) {
        return null;
    }

    return (
        <div className='flex flex-col justify-between items-center h-full' >
            <div className='flex flex-col justify-center items-center h-full w-full'>
                <Song song={currentlyPlaying.simpleSong} isAdmin={isAdmin} streamingService={streamingService}/>
            </div>
            <div className='flex flex-col w-full items-center gap-1'>
                <MediaButtons showMediaButtons={isAdmin} currentlyPlaying={currentlyPlaying.isPlaying} sessionID={sessionID}/>
                <ProgressBar isPlaying={currentlyPlaying.isPlaying} songProgress={currentlyPlaying.songProgressSeconds} songDuration={currentlyPlaying.songDurationSeconds}/>
            </div>
        </div>
    );
}

export default MusicPlayer;