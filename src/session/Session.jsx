import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import Ad from './ads/Ad'
import JoinLink from './join-sidebar/JoinLink'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Session.css'
import { ADMIN_VOTER_TYPE } from '../constants'
import SearchBox from './search-box/SearchBox'
import { useQuery, gql, useMutation } from '@apollo/client';
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
    }
  }
`;

const SUBSCRIBE_SESSION = gql`
  subscription sessionSubscription($sessionID: Int!) {
    sessionUpdated(sessionID: $sessionID){
      id
      currentlyPlaying {
        simpleSong {
          id
          title
          artist
          image
        }
        playing
      }
      queue{
        simpleSong {
          id
          title
          artist
          image
        }
        votes
      }
    }
  }
`;

const JOIN_VOTERS = gql`
  mutation joinVoters {
    joinVoters
  }
`

const GET_VOTER = gql`
  query voter ($sessionID: Int!){
    voter (sessionID: $sessionID){
      type
      songsUpVoted
      songsDownVoted
      bonusVotes
    }
  }
`

function Session() {
    const params = useParams();
    const sessionID = params.sessionID;
    // const haveVoterToken = () => {return sessionStorage.getItem('jwt') == null};
    const [haveVoterToken, setHaveVoterToken] = useState(false);

    // TODO: This keeps token from refreshing, since it will be true if a bad token is already in storage. Old token should be removed if session is expired
    // let haveVoterToken = (() => {
    //     const token = sessionStorage.getItem('jwt');
    //     return token !== null;
    // })();

    // const isAdmin = (voter) => {
    //     if (voter.type === ADMIN_VOTER_TYPE) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    const [voter, setVoter] = useState();

    const [ joinVotersMutation, {error: getVoterTokenError }] = useMutation(JOIN_VOTERS, {
        onCompleted(voterTokenData) {
            // console.log("Voter token: " + voterTokenData.joinVoters);
            sessionStorage.setItem('voter-token', voterTokenData.joinVoters);
            setHaveVoterToken(true);
            // voterQuery();
        },
        refetchQueries: [
            // { query: GET_VOTER },
            // 'voter',
            // { query: GET_SESSION},
            // 'getSession'
        ]
    });

    const { error: voterError } = useQuery(GET_VOTER, {
        variables: { sessionID: sessionID },
        skip: !haveVoterToken,
        onCompleted(voter) {
            console.log("Voter: ", voter.voter);
            setVoter(voter.voter);
        }
    });

    const { subscribeToMore, loading: sessionLoading, error: sessionError, data: sessionData } = useQuery(GET_SESSION, {
        variables: { sessionID: sessionID },
        skip: !haveVoterToken,
    });

    useEffect(() => {
        const subscribeToSession = () => {
            subscribeToMore({
                document: SUBSCRIBE_SESSION,
                variables: { sessionID: sessionID },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    // TODO: There's probably a better way to merge these resulst
                    console.log("receiving session update");
                    const returnSession = structuredClone(prev);
                    returnSession.session = subscriptionData.data.sessionUpdated;
                    return returnSession;
                }
            });
        }
        subscribeToSession();
    }, [subscribeToMore, sessionID]);

    useEffect(() => {
        const getVoterToken = () => {
            joinVotersMutation();
        };
        getVoterToken();
    }, [joinVotersMutation]);


    // Get a voter token if there's no user token in localstorage
    // useEffect(() => {
    //     const joinVoters = () => {
    //         if (haveVoterToken) {
    //             // Call join voters mutation
    //             voterQuery();
    //         }
    //     }
    //     joinVoters();
    // }, [haveVoterToken, voterQuery]);

    // This error should keep whole session from loading, not just queue
    if (sessionLoading) return 'Loading...';
    if (sessionError) return `Error getting session! ${sessionError.message}`;
    // TODO: This is the error if session is full! Should figure out what to display
    if (voterError) return `Error getting voter! ${voterError.message}`;
    if (getVoterTokenError) console.log("Error getting voter token: " + getVoterTokenError);

    if (!sessionData) {
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
                            <MusicPlayer session={sessionData.session} showMediaButtons={true} />
                            <Queue session={sessionData.session} voter={voter} />
                            <SearchBox sessionID={sessionData.session.id} />
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