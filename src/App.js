import Session from './Session';

// Queue Display:
  // Top: Music player
  // Left third/fifth: logo at top and join code
  // Right third/fifth: Ad
  // Middle: Queue
// Voter Display 
  // Top: Music player
  // Middle: queue and vote
  // Bottom: search for new songs

function App() {
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
    <Session />
  );
}

export default App;
