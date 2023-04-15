import React from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { graphql } from '../../gql'

const GET_ACCOUNT = graphql(`
    query getAccount {
    account {
        id
        firstName
        activeSession
    }
    }
`)

const CREATE_SESSION = graphql(`
    mutation createSession {
    createSession{
        activeSession
    }
    }
`)

const GET_VOTER_TOKEN = graphql(`
    query getVoterToken {
        voterToken
    }
`)

const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const redirectURI = 'http://localhost:5173/callback'
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
            accountData.activeSession = accountData.createSession.activeSession;
        },
        refetchQueries: [
            { query: GET_ACCOUNT },
            'account'
        ]
    });
    const [joinVotersQuery, { error: joinVotersMutationError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.voterToken);
            navigate(`/session/${accountData.account.activeSession}`);
        },
    });

    const createSession = () => {
        createSessionMutation();
    }

    const launchSession = (e) => {
        e.preventDefault();
        joinVotersQuery();
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
        if (accountData.account.activeSession === 0) {
            return (
                <div>
                    <div>No Current Session</div>
                    <button onClick={createSession}>Create Session</button>
                </div>
            )
        } else {
            return (
                <div>
                    <div>Current Session: {accountData.account.activeSession}</div>
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