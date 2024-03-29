import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { graphql } from '../../gql';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { StreamingService } from '../../gql/graphql';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';
import { ThemeModeToggle } from '../components/ThemeModeToggle';

const GET_ACCOUNT = graphql(`
    query getAccount {
        account {
            id
            firstName
            lastName
            activeSession
            streamingService
            fazoolTokens
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

const REMOVE_SPOTIFY_STREAMING_SERVICE = graphql(`
    mutation removeSpotifyStreamingService($targetAccountID: Int!) {
        removeSpotifyStreamingService(targetAccountID: $targetAccountID) {
            id
        }
    }
`)

const GET_VOTER_TOKEN = graphql(`
    query getVoterToken ($sessionID: Int!) {
        voterToken(sessionID:$sessionID)
    }
`);

const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const redirectURI = `${import.meta.env.VITE_FRONTEND_SERVER_HTTP_ADDRESS}/callback`
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
            'getAccount',
        ]
    });

    const [removeSpotifyStreamingServiceMutation, { error: removeSpotifyStreamingServiceMutationError }] = useMutation(REMOVE_SPOTIFY_STREAMING_SERVICE, {
        refetchQueries: [
            'getAccount',
        ]
    });

    const [getVoterTokenQuery, { error: getVoterTokenQueryError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            localStorage.setItem('fazool-voter-token', voterTokenData.voterToken);
            navigate(`/session/${getAccountQueryData!.account.activeSession}`);
        },
    });

    const logoOnClick = () => {
        navigate('/');
    }

    const createSession = () => {
        createSessionMutation();
    }

    const launchSession = () => {
        if (localStorage.getItem('fazool-voter-token') == null) {
            getVoterTokenQuery({ variables: { sessionID: getAccountQueryData!.account.activeSession! }});
        } else {
            navigate(`/session/${getAccountQueryData!.account.activeSession}`);
        }
    }

    const removeSpotifyStreamingService = () => {
        removeSpotifyStreamingServiceMutation({ variables: {targetAccountID: getAccountQueryData!.account.id}})
    }

    if (createSessionMutationError) console.log(`Error creating session: ${createSessionMutationError.message}`)
    if (removeSpotifyStreamingServiceMutationError) console.log(`Error removing spotify streaming service: ${removeSpotifyStreamingServiceMutationError}`)
    if (getAccountQueryError) return <div>Error! {getAccountQueryError.message}</div>
    if (getVoterTokenQueryError) return <div>Error getting voter token: {getVoterTokenQueryError.message}</div>

    if (!getAccountQueryData) return <div>Please login</div>

    interface StreamingServiceInfoProps{
        isStreamingServiceRegistered: boolean
    }
    function StreamingServiceInfo({isStreamingServiceRegistered}: StreamingServiceInfoProps) {
        return (
            <Card className='flex flex-col justify-between items-center h-full m-4 md:w-2/5 w-5/6 text-center'>
                <CardHeader>
                    <CardTitle className='text-3xl'>Streaming Service</CardTitle>
                </CardHeader>
                <CardContent className='text-xl'>
                    {isStreamingServiceRegistered ? <p>Spotify</p> : <p>None</p>}
                </CardContent>
                <CardFooter className='flex justify-around w-full'>
                    <a href={spotifyLoginURL}>
                        {isStreamingServiceRegistered ? <Button>Change</Button> : <Button>Link</Button>}
                    </a>
                    {isStreamingServiceRegistered && <Button onClick={removeSpotifyStreamingService} variant={'destructive'}>Remove</Button>}
                    {removeSpotifyStreamingServiceMutationError && <p>{removeSpotifyStreamingServiceMutationError.message}</p>}
                </CardFooter>
            </Card>
        )
    }

    interface SessionInfoProps {
        hasActiveSession: boolean
    }
    function SessionInfo({ hasActiveSession}: SessionInfoProps ) {
        return (
            <Card className='flex flex-col justify-between items-center h-full m-4 md:w-2/5 text-center'>
                <CardHeader>
                    <CardTitle className='text-3xl'>Session</CardTitle>
                </CardHeader>
                <CardContent className='text-xl'>
                    {hasActiveSession 
                    ? <p>Current session: {getAccountQueryData!.account.activeSession}</p> 
                    : <p>No current active session</p>}
                </CardContent>
                {createSessionMutationError && <p className='text-destructive '> {createSessionMutationError.message}</p>}
                <CardFooter>
                    {hasActiveSession 
                    ? <Button onClick={launchSession}>Launch Session</Button> 
                    : <Button onClick={createSession}>Start Session</Button>}
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className='h-full'>
            <div>
                <div className='flex justify-start w-full items-center'>
                    <LogoIcon onClick={logoOnClick} className='w-48 my-2 mx-4'/>
                    <ThemeModeToggle/>
                </div>
                <Separator/>
            </div>
            <div className='flex justify-around items-center h-5/6 md:flex-row flex-col m-4'>
                <div className='text-4xl font-bold text-center'>Welcome {getAccountQueryData.account.firstName}</div>
                <div className='flex md:flex-row flex-col items-center h-2/5'>
                    <SessionInfo hasActiveSession={getAccountQueryData!.account.activeSession !== 0} />
                    <StreamingServiceInfo isStreamingServiceRegistered={getAccountQueryData.account.streamingService !== StreamingService.None}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home