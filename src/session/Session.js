import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import Ad from './ads/Ad'
import JoinLink from './join-sidebar/JoinLink'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Session.css'
import SearchBox from './search-box/SearchBox'
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

// Queue Display:
  // Top: Music player
  // Left third/fifth: logo at top and join code
  // Right third/fifth: Ad
  // Middle: Queue
// Voter Display 
  // Top: Music player
  // Middle: queue and vote
  // Bottom: search for new songs

  const GET_SESSION = gql`
  query getSession($sessionID: Int!){
    session(sessionID: $sessionID){
      id
      queue {
        id
        title
        artist
        image
        votes
      }
    }
  }
`;

const SUBSCRIBE_SESSION = gql`
  subscription sessionSubscription($sessionID: Int!) {
    sessionUpdated(sessionID: $sessionID){
      id
      queue{
        id
        title
        artist
        image
        votes
      }
    }
  }
`;

function Session() {
  const params = useParams();
  const sessionID = params.sessionID;

  const { subscribeToMore, loading, error, data } = useQuery(GET_SESSION, { 
    variables: {sessionID: sessionID}
  });

  useEffect (() => {
    const subscribeToSession = () => {
      subscribeToMore({
        document: SUBSCRIBE_SESSION,
        variables: {sessionID: sessionID},
        updateQuery: (prev, {subscriptionData}) => {
          if(!subscriptionData.data) return prev;
          // TODO: There's probably a better way to merge these resulst
          const returnSession = structuredClone(prev);
          returnSession.session = subscriptionData.data.sessionUpdated;
          return returnSession;
        }
      });
    }
    subscribeToSession();
  }, [subscribeToMore, sessionID]);

  // This error should keep whole session from loading, not just queue
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if(!data.session){
    return null;
  }

  return (
    <>
    <Container>
      <Row>
        <Col xs={3}>
         <JoinLink />
        </Col>
        <Col xs={6}>
          <div className='main-column'>
            <MusicPlayer sessionID={data.session.id}/>
            <Queue  queue={data.session.queue}/>
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

export default Session;
