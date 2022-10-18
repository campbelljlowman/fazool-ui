import QueueItem from './QueueItem'
import './Queue.css'



function Queue ({ queue }) {
  if(!queue){
    return null;
  }

  return (
      <div className='queue'>
          {queue.map(song => (
            <QueueItem key={song.id} song={song} />
          ))}
      </div>
  );
}

export default Queue;
