import QueueItem from './QueueItem'
import './Queue.css'



function Queue ({ session, votes }) {

  const checkVotedFor = (song) => {
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
            <QueueItem key={song.id} song={song} sessionID={session.id} showDecrement={false} votedFor={checkVotedFor(song.id)} />
          ))}
      </div>
  );
}

export default Queue;
