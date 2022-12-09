import QueueItem from './QueueItem'
import './Queue.css'

const adminVoterType = "admin"

function Queue ({ session, voter }) {

  const checkVotedFor = (song, votes) => {
    if (voter.type === adminVoterType){
      return false
    }
    if(votes){
      return votes.includes(song);
    }
    return false;
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
  if(!voter){
    return null;
  }

  return (
      <div className='queue'>
          {session.queue.map(song => (
            <QueueItem key={song.id} song={song} sessionID={session.id} showDecrement={true} upVotedFor={checkUpVotedFor(song.id)} downVotedFor={checkDownVotedFor(song.id)} />
          ))}
      </div>
  );
}

export default Queue;
