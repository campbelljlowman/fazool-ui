import { SimpleSong } from '../../gql/graphql'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface CurrentlyPlayingSongProps {
    song: SimpleSong
}
function CurrentlyPlayingSong({ song }: CurrentlyPlayingSongProps) {
    if (!song) {
        return null;
    }

    return (
        <div className='flex flex-col w-1/2 mt-6 p-2'>
            <AspectRatio ratio={1}>
                <img className='rounded' src={song.image} alt='Album Cover'  />
            </AspectRatio>
            <h3 className='font-medium w-full truncate mt-1' >{song.title}</h3>
            <p className='text-xs text-muted-foreground w-full truncate'>{song.artist}</p>
        </div>
    );
}

export default CurrentlyPlayingSong