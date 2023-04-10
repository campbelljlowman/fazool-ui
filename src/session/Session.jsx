import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import Ad from './ads/Ad'
import JoinLink from './join-sidebar/JoinLink'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Session.css'
import { ADMIN_VOTER_TYPE } from '../constants'
import SearchBox from './search-box/SearchBox'
import { useQuery, gql } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const SUBSCRIBE_SESSION_STATE = gql`
  subscription subscribeSessionState($sessionID: Int!){
      subscribeSessionState(sessionID: $sessionID){
          currentlyPlaying {
              simpleSong{
                  id
                  title
                  artist
                  image
              }
              playing
          }
          queue {
              simpleSong {
                  id
                  title
                  artist
                  image
              }
              votes
          }
          numberOfVoters
      }
  }
`;

const GET_SESSION_STATE = gql`
  query getSessionState($sessionID: Int!){
    sessionState(sessionID: $sessionID){
      currentlyPlaying {
        simpleSong{
          id
          title
          artist
          image
        }
        playing
      }
      queue {
        simpleSong {
          id
          title
          artist
          image
        }
        votes
      }
      numberOfVoters
    }
  }
`;

const GET_SESSION_CONFIG = gql`
  query getSessionConfig($sessionID: Int!){
    sessionConfig(sessionID: $sessionID){
      id
      adminAccountID
      maximumVoters
    }
  }
`;


const GET_VOTER = gql`
  query voter ($sessionID: Int!){
    voter (sessionID: $sessionID){
      type
      songsUpVoted
      songsDownVoted
      bonusVotes
    }
  }
`;

function Session() {
    const params = useParams();
    const navigate = useNavigate();
    const sessionID = params.sessionID;
    const [voter, setVoter] = useState();

    const isAdmin = (voter) => {
        if (voter.type === ADMIN_VOTER_TYPE) {
            return true;
        } else {
            return false;
        }
    };

    const { error: voterError } = useQuery(GET_VOTER, {
        variables: { sessionID: sessionID },
        onCompleted(voter) {
            console.log("Voter: ", voter.voter);
            setVoter(voter.voter);
        }
    });

    const { subscribeToMore, loading: sessionStateLoading, error: sessionStateError, data: sessionState } = useQuery(GET_SESSION_STATE, {
        variables: { sessionID: sessionID },
    });

    const { data: sessionConfig } = useQuery(GET_SESSION_CONFIG, {
        variables: { sessionID: sessionID }
    });

    useEffect(() => {
      const checkForVoterToken = () => {
        if (sessionStorage.getItem('voter-token') == null) {
          navigate("/join");
        }
      };
      checkForVoterToken();
  });

    useEffect(() => {
        const subscribeToSession = () => {
            subscribeToMore({
                document: SUBSCRIBE_SESSION_STATE,
                variables: { sessionID: sessionID },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    // TODO: There's probably a better way to merge these resulst
                    console.log("receiving session update");
                    console.log(JSON.stringify(subscriptionData));
                    const returnSession = structuredClone(prev);
                    returnSession.sessionState = subscriptionData.data.subscribeSessionState;
                    return returnSession;
                }
            });
        }
        subscribeToSession();
    }, [subscribeToMore, sessionID]);



    // This error should keep whole session from loading, not just queue
    if (sessionStateLoading) return 'Loading...';
    if (sessionStateError) return `Error getting session state! ${sessionError.message}`;
    // TODO: This is the error if session is full! Should figure out what to display
    if (voterError) return `Error getting voter! ${voterError.message}`;

    if (!sessionState) {
        return null;
    }
    if (!voter) {
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
                            <MusicPlayer sessionID={sessionID} currentlyPlaying={sessionState.sessionState.currentlyPlaying} showMediaButtons={isAdmin(voter)} />
                            <Queue sessionID={sessionID} sessionState={sessionState.sessionState} voter={voter} />
                            <SearchBox sessionID={sessionID} />
                        </div>
                    </Col>
                    <Col xs={3}>
                        <Ad />
                    </Col>
                </Row>
            </Container>
        </>);
}

export default Session;
