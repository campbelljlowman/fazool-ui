import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import Ad from './ads/Ad'
import JoinLink from './join-sidebar/JoinLink'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import SearchBox from './search-box/SearchBox'

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
    <>
    <Container>
      <Row>
        <Col xs={3}>
         <JoinLink />
        </Col>
        <Col xs={6}>
          <div className='main-column'>
            <MusicPlayer />
            <Queue />
            <SearchBox />
          </div>
        </Col>
        <Col xs={3}>
          <Ad />
        </Col>
      </Row>
    </Container>
    </>  );
}

export default App;
