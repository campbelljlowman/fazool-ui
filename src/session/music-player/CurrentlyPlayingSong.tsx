import { SimpleSong } from '../../gql/graphql'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface CurrentlyPlayingSongProps {
    song: SimpleSong
}
function CurrentlyPlayingSong({ song }: CurrentlyPlayingSongProps) {
    if (!song.artist && !song.image && !song.title) {
        return (
            <Alert className='w-5/6'>
                <AlertTitle>
                    <p>No song is playing!</p>
                </AlertTitle>
                <AlertDescription>
                    <p>Start playing some music using your streaming service</p>
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className='flex flex-col w-1/2'>
            <AspectRatio ratio={1}>
                <img className='rounded' src={song.image} alt='Album Cover'  />
            </AspectRatio>
            <h3 className='font-medium w-full truncate mt-1' >{song.title}</h3>
            <p className='text-xs text-muted-foreground w-full truncate'>{song.artist}</p>
        </div>
    );
}

export default CurrentlyPlayingSong