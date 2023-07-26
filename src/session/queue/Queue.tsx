import QueueItem from './QueueItem'
import { SessionState, Voter, VoterType } from '../../gql/graphql'
import { ScrollArea } from '@/components/ui/scroll-area'

interface QueueProps {
    sessionID:      number,
    sessionState:   SessionState | null | undefined,
    voter:          Voter

}
function Queue({ sessionID, sessionState, voter }: QueueProps) {

    const checkVotedFor = (song: string, votes: string[]) => {
        if (voter.type === VoterType.Admin) {
            return false
        }
        if (votes) {
            return votes.includes(song);
        }
        return false;
    }

    const checkPrivilegedVoter = () => {
        if (voter.type === VoterType.Free) {
            return false;
        } else {
            return true;
        }
    }

    const checkUpVotedFor = (song: string) => {
        if (voter.songsUpVoted) {
            return checkVotedFor(song, voter.songsUpVoted)
        } else {
            return false
        }
    }

    const checkDownVotedFor = (song: string) => {
        if (voter.songsDownVoted) {
            return checkVotedFor(song, voter.songsDownVoted)
        } else {
            return false
        }
    }

    if (!sessionState || !sessionState.queue) {
        return null;
    }


    return (
        <ScrollArea>
            <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 overflow-auto max-h-[100vh]'>
                {sessionState.queue.map(queuedSong => (
                    <QueueItem key={queuedSong.simpleSong.id} queuedSong={queuedSong} sessionID={sessionID} showDecrement={checkPrivilegedVoter()} upVotedFor={checkUpVotedFor(queuedSong.simpleSong.id)} downVotedFor={checkDownVotedFor(queuedSong.simpleSong.id)} />
                ))}
            </div>
        </ScrollArea>
    );
}

export default Queue;
