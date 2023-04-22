import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
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
    query getVoterToken {
        voterToken
    }
`);

const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const redirectURI = `${import.meta.env.VITE_BACKEND_HTTP_SERVER}/callback`
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

    const { error: getAccountQueryError, data: getAccountQueryData } = useQuery(GET_ACCOUNT, {
        onError(){
            console.log("No account data found, redirecting to login page");
            navigate("/login");   
        }
    });

    const [createSessionMutation, { error: createSessionMutationError }] = useMutation(CREATE_SESSION, {
        refetchQueries: [
            { query: GET_ACCOUNT },
        ]
    });

    const [getVoterTokenQuery, { error: getVoterTokenQueryError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.voterToken);
            navigate(`/session/${getAccountQueryData!.account.activeSession}`);
        },
    });

    const createSession = () => {
        createSessionMutation();
    }

    const launchSession = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        getVoterTokenQuery();
    }

    if (createSessionMutationError) console.log(`Error creating session: ${createSessionMutationError.message}`)
    if (getAccountQueryError) return <div>Error! {getAccountQueryError.message}</div>
    if (getVoterTokenQueryError) return <div>Error getting voter token: {getVoterTokenQueryError.message}</div>

    if (!getAccountQueryData) return <div>Please login</div>

    interface SessionInfoProps {
        hasActiveSession: boolean
    }
    function SessionInfo({ hasActiveSession}: SessionInfoProps ) {
        if (hasActiveSession) {
            return (
                <div>
                    <div>Current Session: {getAccountQueryData!.account.activeSession}</div>
                    <button onClick={launchSession}>Launch Session</button>
                </div>
            )
        } else {
            return (
                <div>
                    <div>No Current Session</div>
                    <button onClick={createSession}>Create Session</button>
                </div>
            )

        }
    }

    return (
        <>
            <div>Home</div>
            <div>Welcome {getAccountQueryData.account.firstName}</div>
            <SessionInfo hasActiveSession={getAccountQueryData!.account.activeSession !== 0} />
            <a href={spotifyLoginURL}>Register Spotify</a>
        </>
    )
}

export default Home