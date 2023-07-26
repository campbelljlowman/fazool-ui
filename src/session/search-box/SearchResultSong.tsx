import { SimpleSong } from '../../gql/graphql';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

interface SongProps {
    song: SimpleSong
}
function Song({ song }: SongProps) {
    if (!song) {
        return null;
    }

    return (
        <div className="flex gap-2 items-center">
            <div className='w-12'>
                <AspectRatio ratio={1}>
                    <img className='rounded h-full w-auto' src={song.image} alt="Album Cover" />
                </AspectRatio>
            </div>
            <div className="truncate w-5/6">
                <div className="font-medium truncate">{song.title}</div>
                <div className="text-xs text-muted-foreground truncate">{song.artist}</div>
            </div>
        </div>
    );
}

export default Song;