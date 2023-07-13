import JoinQRCode from '../../assets/images/join-qr-code.png'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface JoinLinkProps {
    sessionID: number,
    numberOfVoters: number,
    maximumVoters: number
}
function JoinLink({ sessionID, numberOfVoters, maximumVoters}: JoinLinkProps) {
    return (
        <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col items-center w-full mt-4'>
                <p className='font-medium text-2xl'>{numberOfVoters}/{maximumVoters} Voters</p>
                <p className='text-muted-foreground '>Session {sessionID}</p>
            </div>
            <div className='flex flex-col w-1/2 mb-4'>
                    <AspectRatio ratio={1}>
                        <img className='rounded-lg h-full w-auto' src={JoinQRCode} alt='QR code link to fazool.party' />
                    </AspectRatio>
                <p className='text-xl leading-6 mt-2'>fazool.us/join</p>
                <p className='text-muted-foreground'>Free, no account required</p>
            </div>
        </div>
    );
}

export default JoinLink;