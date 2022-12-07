import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import Ad from './ads/Ad'
import JoinLink from './join-sidebar/JoinLink'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Session.css'
import SearchBox from './search-box/SearchBox'
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

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
      currentlyPlaying {
        id
        title
        artist
        image
        playing
      }
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
      currentlyPlaying {
        id
        title
        artist
        image
        playing
      }
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

const GET_VOTER_TOKEN = gql`
  query voterToken {
    voterToken
  }
`

const GET_VOTER = gql`
  query voter ($sessionID: Int!){
    voter (sessionID: $sessionID){
      type
      songsVotedFor
      bonusVotes
    }
  }

`


function Session() {
  const params = useParams();
  const sessionID = params.sessionID;
  // TODO: This keeps token from refreshing, since it will be true if a bad token is already in storage. Old token should be removed if session is expired
  let haveVoterToken = (() => {
    let token = sessionStorage.getItem('jwt');
    return token !== null;
  })();

  const [votes, setVotes] = useState();

  useQuery(GET_VOTER_TOKEN, {
    skip: haveVoterToken,
    onCompleted(voterTokenData){
      sessionStorage.setItem('jwt', voterTokenData.voterToken);
      haveVoterToken = true;
    }
  });

  const [ voterQuery, {error: voterError}] = useLazyQuery(GET_VOTER, {
    variables: {sessionID: sessionID},
    onCompleted(voter){
      setVotes(voter.voter.songsVotedFor);
      console.log("votes after query: " + voter.voter.songsVotedFor);
    }
  });

  const { subscribeToMore, loading: sessionLoading, error: sessionError, data: sessionData } = useQuery(GET_SESSION, { 
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

  // Get a voter token if there's no user token in localstorage
  useEffect (() => {
    const joinVoters = () => {
      if (haveVoterToken) {
        // Call join voters mutation
        voterQuery();
      }
    }
    joinVoters();
  }, [haveVoterToken, voterQuery]);

  // This error should keep whole session from loading, not just queue
  if (sessionLoading) return 'Loading...';
  if (sessionError) return `Error! ${sessionError.message}`;
  // TODO: This is the error if session is full! Should figure out what to display
  if (voterError) return `Error! ${voterError.message}`;

  if(!sessionData.session){
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
            <MusicPlayer session={sessionData.session}/>
            <Queue  session={sessionData.session} votes={votes} />
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
