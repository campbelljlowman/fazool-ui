import React from 'react'
import Header from './QueueHeader'
import QueueItem from './QueueItem'

function Queue () {
  // const [songs, setSongs] = useState([]);

  // useEffect(() => {
  //   const fetchSongs = async () => {
  //     const rsp = await fetch("/houses.json")
  //     const songs = await rsp.json();
  //     setSongss(songs);
  //   };
  //   setSongs();
  // }, []);


  return (
    <div > 
        <Header></Header>
        <div>
            <QueueItem></QueueItem>
            <QueueItem></QueueItem>
            <QueueItem></QueueItem>
            <QueueItem></QueueItem>
        </div>
    </div>
  );
}

export default Queue;
