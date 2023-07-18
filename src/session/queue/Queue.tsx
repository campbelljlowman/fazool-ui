import QueueItem from './QueueItem'
import { SessionState, Voter, VoterType } from '../../gql/graphql'

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
        <div className='h-[92vh]'>
            <div className='grid grid-cols-6 overflow-auto max-h-full'>
                {sessionState.queue.map(queuedSong => (
                    <QueueItem key={queuedSong.simpleSong.id} queuedSong={queuedSong} sessionID={sessionID} showDecrement={checkPrivilegedVoter()} upVotedFor={checkUpVotedFor(queuedSong.simpleSong.id)} downVotedFor={checkDownVotedFor(queuedSong.simpleSong.id)} />
                ))}
            </div>
        </div>
    );
}

export default Queue;
