import QueueItem from './QueueItem'
import './Queue.css'



function Queue ({ session, upVotes, downVotes }) {

  const checkVotedFor = (song, votes) => {
    console.log("song: " + song);
    if(votes){
      console.log("votes when rendering song: " + votes);
      return votes.includes(song);
    }
    return false;
  }


  if(!session.queue){
    return null;
  }

  return (
      <div className='queue'>
          {session.queue.map(song => (
            <QueueItem key={song.id} song={song} sessionID={session.id} showDecrement={true} upVotedFor={checkVotedFor(song.id, upVotes)} downVotedFor={checkVotedFor(song.id, downVotes)} />
          ))}
      </div>
  );
}

export default Queue;
