import QueueItem from './QueueItem'
import './Queue.css'
import { ADMIN_VOTER_TYPE, REGULAR_VOTER_TYPE } from '../../constants'


function Queue ({ session, voter }) {

  const checkVotedFor = (song, votes) => {
    if (voter.type === ADMIN_VOTER_TYPE){
      return false
    }
    if(votes){
      return votes.includes(song);
    }
    return false;
  }

  const checkPrivilegedVoter = () => {
    if (voter.type === REGULAR_VOTER_TYPE) {
      return false;
    } else {
      return true;
    }
  }

  const checkUpVotedFor = (song) => {
    if(voter.songsUpVoted){
      return checkVotedFor(song, voter.songsUpVoted)
    } else {
      return false
    }
  }

  const checkDownVotedFor = (song) => {
    if(voter.songsDownVoted){
      return checkVotedFor(song, voter.songsDownVoted)
    } else {
      return false
    }
  }

  if(!session.queue){
    return null;
  }


  return (
      <div className='queue'>
          {session.queue.map(song => (
            <QueueItem key={song.id} song={song} sessionID={session.id} showDecrement={checkPrivilegedVoter()} upVotedFor={checkUpVotedFor(song.id)} downVotedFor={checkDownVotedFor(song.id)} />
          ))}
      </div>
  );
}

export default Queue;
