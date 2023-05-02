import { SimpleSong } from '../../gql/graphql'
import './CurrentlyPlayingSong.css'

interface CurrentlyPlayingSongProps {
    song: SimpleSong
}
function CurrentlyPlayingSong({ song }: CurrentlyPlayingSongProps) {
    if (!song) {
        return null;
    }

    return (
        <div className="currently-playing-song">
            <img className="currently-playing-album-cover" src={song.image} alt="Album Cover"  />
            <div className="currently-playing-song-title">{song.title}</div>
            <div className="currently-playing-song-artist">{song.artist}</div>
        </div>
    );
}

export default CurrentlyPlayingSong