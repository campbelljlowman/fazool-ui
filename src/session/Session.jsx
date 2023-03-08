import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import Ad from './ads/Ad'
import JoinSidebar from './join-sidebar/JoinSidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Session.css'
import { ADMIN_VOTER_TYPE } from '../constants'
import SearchBox from './search-box/SearchBox'
import { useQuery, gql } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


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

    const { startPolling, loading: sessionLoading, error: sessionError, data: sessionData } = useQuery(GET_SESSION, {
        variables: { sessionID: sessionID },
        pollInterval: 2000,
    });

    useEffect(() => {
      const checkForVoterToken = () => {
        if (sessionStorage.getItem('voter-token') == null) {
          navigate("/join");
        }
      };
      checkForVoterToken();
  });

  // Can remove once bug in apollo is fixed, should be v 3.7.11
    useEffect(() => {
      const startThePolling = () => {
        startPolling(2000);
      };
      startThePolling();
    });



    // This error should keep whole session from loading, not just queue
    if (sessionLoading) return 'Loading...';
    if (sessionError) return `Error getting session! ${sessionError.message}`;
    // TODO: This is the error if session is full! Should figure out what to display
    if (voterError) return `Error getting voter! ${voterError.message}`;

    if (!sessionData) {
        return null;
    }
    if (!voter) {
        return null;
    }

    return (
        <>
                {/* <div className='row'>
                    <div>
                    Placeholder css grid row for bonus vote and account upgrade
                    Don't need a css grid if only displaying on mobile
                    </div>
                </div> */}
            <div className='container-fluid session'>
                <div className='row'>
                    <div className='d-none d-md-block col-md-3'>
                            <JoinSidebar currentNumberOfVoters={57} maxNumberOfVoters={100}/>
                    </div>
                    <div className='col-sm-12 col-xs-12 col-md-6'>
                        <div className='main-column'>
                            <MusicPlayer session={sessionData.session} showMediaButtons={isAdmin(voter)} />
                            <Queue session={sessionData.session} voter={voter} />
                            <SearchBox sessionID={sessionData.session.id} />
                        </div>
                    </div>
                    <div className='d-none d-md-block col-md-3'>
                        <Ad />
                    </div>
                </div>
            </div>
        </>);
}

export default Session;
