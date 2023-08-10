import { SimpleSong } from '../../gql/graphql'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { toLowerCaseBesidesFirst } from '@/utils'

interface CurrentlyPlayingSongProps {
    song:               SimpleSong
    isAdmin:            boolean
    streamingService:   string | null | undefined
}
function CurrentlyPlayingSong({ song, isAdmin, streamingService }: CurrentlyPlayingSongProps) {
    if (!song.artist && !song.image && !song.title) {
        return (
            <Alert className='w-5/6'>
                <AlertCircle className='h-4 w-4'/>
                <AlertTitle>
                    <p>No song is playing!</p>
                </AlertTitle>
                <AlertDescription>
                    {isAdmin && streamingService ? 
                        <p>Start playing some music using {toLowerCaseBesidesFirst(streamingService)}</p>
                    :
                        <p>Ask your host to start some music</p>
                    }
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