import QueueItem from './QueueItem'
import './Queue.css'



function Queue ({ session }) {
  if(!session.queue){
    return null;
  }

  return (
      <div className='queue'>
          {session.queue.map(song => (
            <QueueItem key={song.id} song={song} sessionID={session.id} />
          ))}
      </div>
  );
}

export default Queue;
