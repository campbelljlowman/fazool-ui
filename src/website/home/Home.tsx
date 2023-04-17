// import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useQuery, useMutation } from 'urql';
import { useNavigate } from "react-router-dom";
import { graphql } from '../../gql';

const GET_ACCOUNT = graphql(`
    query getAccount {
        account {
            id
            firstName
            activeSession
        }
    }
`);

const CREATE_SESSION = graphql(`
    mutation createSession {
        createSession{
            activeSession
        }
    }
`);

const GET_VOTER_TOKEN = graphql(`
    mutation getVoterToken {
        voterToken
    }
`);

const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const redirectURI = 'http://localhost:5173/callback';
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

    const [{ fetching, error: queryError, data: accountData }] = useQuery({query: GET_ACCOUNT});
    const [createSessionResult, createSessionMutation] = useMutation(CREATE_SESSION);
    const [getVoterTokenResult, getVoterTokenMutation] = useMutation(GET_VOTER_TOKEN);

    const createSession = () => {
        createSessionMutation({}).then(result => {
            if(result.error){
                console.log(`Error creating session: ${result.error.message}`);
            }
        });
    }

    const launchSession = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        getVoterTokenMutation({}).then(result => {
            if(result.error){
                console.log(`Error getting voter token: ${result.error.message}`);
            }
            sessionStorage.setItem('voter-token', result.data!.voterToken);
            navigate(`/session/${accountData!.account.activeSession}`);    
        });
    }

    
    if (!accountData) {
        console.log(accountData);
        return <div>Please register or login</div>
    }

    if (fetching) return <div>Loading...</div>
    if (queryError) return <div>Error! {queryError.message}</div>

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