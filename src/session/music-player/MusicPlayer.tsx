import Song from './CurrentlyPlayingSong';
import MediaButtons from './MediaButtons'
import './MusicPlayer.css'
import { CurrentlyPlayingSong } from '../../gql/graphql';
import ProgressBar from './ProgressBar';



interface MusicPlayerProps {
    sessionID:          number,
    currentlyPlaying:   CurrentlyPlayingSong | null | undefined,
    showMediaButtons:   boolean
}

function MusicPlayer({ sessionID, currentlyPlaying, showMediaButtons }: MusicPlayerProps) {

    if (!currentlyPlaying) {
        return null;
    }

    return (
        <div className="music-player" >
            <Song song={currentlyPlaying.simpleSong} />
            <MediaButtons showMediaButtons={showMediaButtons} currentlyPlaying={currentlyPlaying.isPlaying} sessionID={sessionID}/>
            <ProgressBar isPlaying={currentlyPlaying.isPlaying} songProgress={currentlyPlaying.songProgressSeconds} songDuration={currentlyPlaying.songDurationSeconds}/>
        </div>
    );
}

export default MusicPlayer;