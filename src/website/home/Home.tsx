import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { graphql } from '../../gql';
import './Home.css'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import React from 'react';
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';
import { StreamingService } from '../../gql/graphql';

const MdFilledButtonComponent = createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButton,
    react: React,
});

const GET_ACCOUNT = graphql(`
    query getAccount {
        account {
            id
            firstName
            activeSession
            streamingService
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

    const launchSession = (e: React.MouseEvent<MdFilledButton>) => {
        e.preventDefault();
        getVoterTokenQuery();
    }

    if (createSessionMutationError) console.log(`Error creating session: ${createSessionMutationError.message}`)
    if (getAccountQueryError) return <div>Error! {getAccountQueryError.message}</div>
    if (getVoterTokenQueryError) return <div>Error getting voter token: {getVoterTokenQueryError.message}</div>

    if (!getAccountQueryData) return <div>Please login</div>

    interface StreamingServiceInfoProps{
        isStreamingServiceRegistered: boolean
    }
    function StreamingServiceInfo({isStreamingServiceRegistered}: StreamingServiceInfoProps) {
        if (isStreamingServiceRegistered) {
            return (
                <>
                    <div className='headline-small'>Spotify</div>
                    <MdFilledButtonComponent href={spotifyLoginURL} onClick={createSession}>Change</MdFilledButtonComponent>  
                </>
            )
        } else {
            return (
                <>
                    <div className='headline-small'>None</div>
                    <MdFilledButtonComponent href={spotifyLoginURL} onClick={createSession}>Link</MdFilledButtonComponent>  
                </>
            )
        }
    }

    interface SessionInfoProps {
        hasActiveSession: boolean
    }
    function SessionInfo({ hasActiveSession}: SessionInfoProps ) {
        if (hasActiveSession) {
            return (
                <>
                    <div className='headline-small'>Current session: {getAccountQueryData!.account.activeSession}</div>
                    <MdFilledButtonComponent className='navigation-button' onClick={launchSession}>Launch Session</MdFilledButtonComponent>   
                </>
            )
        } else {
            return (
                <>
                    <div className='headline-small'>No current active session</div>
                    <MdFilledButtonComponent className='navigation-button'  onClick={createSession}>Start</MdFilledButtonComponent>   
                </>
            )

        }
    }

    return (
        <div className='home-page'>
            <LogoIcon className='logo-wrapper'/>
            <div className='home-page-body-1'>
                <div className='display-medium'>Welcome {getAccountQueryData.account.firstName}</div>
                <div className='account-info'>
                    <div className='account-info-card'>
                        <h1 className='headline-large'>Session</h1>
                        <SessionInfo hasActiveSession={getAccountQueryData!.account.activeSession !== 0} />
                    </div>
                    <div className='account-info-card'>
                        <h1 className='headline-large'>Streaming Service</h1>
                        <StreamingServiceInfo isStreamingServiceRegistered={getAccountQueryData.account.streamingService !== StreamingService.None}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home