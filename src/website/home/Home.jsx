import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";

const GET_ACCOUNT = gql`
query getAccount {
  account{
		id
    firstName
    sessionID
  }
}`

const CREATE_SESSION = gql`
mutation createSession {
  createSession{
    sessionID
  }
}
`

const JOIN_VOTERS = gql`
  mutation joinVoters {
    joinVoters
  }
`
const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const redirectURI = 'http://localhost:3000/callback'
var scope = 'user-modify-playback-state user-read-playback-state';

//TODO: Add state to request
const spotifyLoginURL = `https://accounts.spotify.com/authorize?
client_id=${spotifyClientId}
&scope=${scope}
&redirect_uri=${redirectURI}
&response_type=code
`

function Home() {
    const navigate = useNavigate();
    const { loading, error: queryError, data: accountData } = useQuery(GET_ACCOUNT);

    const [createSessionMutation, { error: mutationError }] = useMutation(CREATE_SESSION, {
        onCompleted(accountData) {
            console.log(accountData);
            accountData.sessionID = accountData.createSession.sessionID;
        },
        refetchQueries: [
            { query: GET_ACCOUNT },
            'account'
        ]
    });
    const [joinVotersMutation, { error: joinVotersMutationError }] = useMutation(JOIN_VOTERS, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.joinVoters);
            navigate(`/session/${accountData.account.sessionID}`);
        },
    });

    const createSession = () => {
        createSessionMutation();
    }

    const launchSession = (e) => {
        e.preventDefault();
        joinVotersMutation();
    }

    if (loading) return 'Loading...';
    if (mutationError) return `Error! ${mutationError.message}`;
    if (queryError) return `Error! ${queryError.message}`;
    if (joinVotersMutationError) return `Error joining voters: ${joinVotersMutationError.message}`;

    if (!accountData) {
        console.log(accountData);
        return "Please register or login";
    }

    const sessionInfo = () => {
        if (accountData.account.sessionID === 0) {
            return (
                <div>
                    <div>No Current Session</div>
                    <button onClick={createSession}>Create Session</button>
                </div>
            )
        } else {
            return (
                <div>
                    <div>Current Session: {accountData.account.sessionID}</div>
                    <button onClick={launchSession}>Launch Session</button>
                </div>
            )
        }
    }

    const spotifyInfo = () => {
        return (
            <div>
                <a href={spotifyLoginURL}>Register Spotify</a>
            </div>
        )
    }

    return (
        <div>
            <div>Home</div>
            <div>Welcome {accountData.account.firstName}</div>
            <div>{sessionInfo()}</div>
            <div>{spotifyInfo()}</div>
        </div>
    )
}

export default Home