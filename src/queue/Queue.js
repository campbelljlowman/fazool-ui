import React, { useEffect, useState } from 'react'
import QueueItem from './QueueItem'
import './Queue.css'

function Queue () {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const rsp = await fetch("/songs.json");
      const songs = await rsp.json();
      setQueue(songs);
    };
    fetchSongs().catch(console.error("Error reading songs.json file"));
  }, []);

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
