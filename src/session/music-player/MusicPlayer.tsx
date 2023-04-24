import Song from './Song';
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
            <MediaButtons showMediaButtons={showMediaButtons} currentlyPlaying={currentlyPlaying.playing} sessionID={sessionID}/>
            <ProgressBar />
        </div>
    );
    // return (
    //     <div className="music-player" >
    //         <Song song={currentlyPlaying.simpleSong} />
    //         <MediaButtons showMediaButtons={showMediaButtons} />
    //     </div>
    // );
}

export default MusicPlayer;