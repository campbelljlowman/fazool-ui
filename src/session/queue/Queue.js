import QueueItem from './QueueItem'
import './Queue.css'



function Queue ({ session, songsVotedFor }) {

  // const checkVotedFor = (song, songsVotedFor) => {

  // }

  if(!session.queue){
    return null;
  }

  return (
      <div className='queue'>
          {session.queue.map(song => (
            <QueueItem key={song.id} song={song} sessionID={session.id} showDecrement={true} votedFor={true} />
          ))}
      </div>
  );
}

export default Queue;
