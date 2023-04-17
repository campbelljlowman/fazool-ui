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
        refetchQueries: [
            { query: GET_ACCOUNT },
            'account'
        ]
    });

    const [joinVotersQuery, { error: joinVotersMutationError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.voterToken);
            navigate(`/session/${accountData!.account.activeSession}`);
        },
    });

    const createSession = () => {
        createSessionMutation();
    }

    const launchSession = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        joinVotersQuery();
    }

    
    if (!accountData) {
        console.log(accountData);
        return <div>Please register or login</div>
    }

    if (loading) return <div>Loading...</div>
    if (mutationError) return <div>Error! {mutationError.message}</div>
    if (queryError) return <div>Error! {queryError.message}</div>
    if (joinVotersMutationError) return <div>Error joining voters: {joinVotersMutationError.message}</div>

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