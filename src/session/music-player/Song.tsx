import { SimpleSong } from '../../gql/graphql'
import './Song.css'

interface SongProps {
    song: SimpleSong
}
function Song({ song }: SongProps) {
    if (!song) {
        return null;
    }

    return (
        <div className="cp-song">
            <img className="cp-album-cover" src={song.image} alt="Album Cover"  />
            <div className="cp-song-title">{song.title}</div>
            <div className="cp-song-artist">{song.artist}</div>
        </div>
    );
}

export default Song