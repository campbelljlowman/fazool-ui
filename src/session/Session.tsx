import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import JoinLink from './join-link/JoinLink'
import './Session.css'
import SearchBox from './search-box/SearchBox'
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { graphql } from '../gql'
import { Voter, VoterType } from '../gql/graphql'
import PlaylistPopulate from './playlist-populate/PlaylistPopulate'
import { Separator } from '@/components/ui/separator'
import PurchaseHeader from './purchase-header/PurchaseHeader'

const SUBSCRIBE_SESSION_STATE = graphql(`
    subscription subscribeSessionState($sessionID: Int!){
        subscribeSessionState(sessionID: $sessionID){
            currentlyPlaying {
                simpleSong{
                    id
                    title
                    artist
                    image
                }
                isPlaying
                songProgressSeconds
                songDurationSeconds
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
`);

const GET_SESSION_STATE = graphql(`
    query getSessionState($sessionID: Int!){
        sessionState(sessionID: $sessionID){
            currentlyPlaying {
                simpleSong{
                    id
                    title
                    artist
                    image
                }
                isPlaying
                songProgressSeconds
                songDurationSeconds
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
`);

const GET_SESSION_CONFIG = graphql(`
    query getSessionConfig($sessionID: Int!){
        sessionConfig(sessionID: $sessionID){
            sessionID
            adminAccountID
            maximumVoters
        }
    }
`);


const GET_VOTER = graphql(`
    query voter ($sessionID: Int!){
        voter (sessionID: $sessionID){
            id
            accountID
            type
            songsUpVoted
            songsDownVoted
            bonusVotes
        }
    }
`);

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

function Session() {
    const params = useParams();
    if (!params.sessionID) {
        throw new Error("Unexpected error: Missing sessionID");
    }

    const navigate = useNavigate();
    const sessionID = parseInt(params.sessionID)

    const isAdmin = (voter: Voter) => {
        if (voter.type === VoterType.Admin) {
            return true;
        } else {
            return false;
        }
    };

    const { data: getVoterQueryData, error: getVoterQueryError } = useQuery(GET_VOTER, {variables: { sessionID: sessionID }});

    const { data: getAccountQueryData } = useQuery(GET_ACCOUNT);

    const { data: getSessionConfigQueryData, error: getSessionConfigQueryError } = useQuery(GET_SESSION_CONFIG, {variables: { sessionID: sessionID }});
    
    const { subscribeToMore, error: getSessionStateQueryError, data: getSessionStateQueryData } = useQuery(GET_SESSION_STATE, {variables: { sessionID: sessionID }});
    
    useEffect(() => {
        const checkForVoterToken = () => {
            if (localStorage.getItem('fazool-voter-token') == null) {
                navigate("/join");
            }
        };
        checkForVoterToken();
    }, []);

    useEffect(() => {
        const checkForVoterRefresh = () => {
            // console.log("Checking tokens")
            // console.log(`voter account ID: ${getVoterQueryData?.voter.accountID}`)
            // console.log(`account ID: ${getAccountQueryData?.account.id}`)
            if (getVoterQueryData?.voter.accountID != getAccountQueryData?.account.id) {
                location.reload()
            }
        };
        checkForVoterRefresh();
    }, []);

    useEffect(() => {
        const subscribeToSession = () => {
            subscribeToMore({
                document: SUBSCRIBE_SESSION_STATE,
                variables: { sessionID: sessionID },
                onError(error) {
                    // If subscription is closed, reload page to refresh subscription.
                    // This is workaround for iPhones disconnecting, could possibly cause issues
                    if (error.message === "Socket closed") {
                        location.reload()
                    }
                },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    // TODO: There's probably a better way to merge these resulst
                    // console.log("receiving session update");
                    const returnSession = structuredClone(prev);
                    returnSession.sessionState = subscriptionData.data.subscribeSessionState;
                    return returnSession;
                }
            });
        }
        subscribeToSession();
    }, []);



    // This error should keep whole session from loading, not just queue
    if (getSessionStateQueryError) return <div>Error getting session state! {getSessionStateQueryError.message}</div>
    if (getSessionConfigQueryError) return <div>Error getting session config! {getSessionConfigQueryError.message}</div>
    // TODO: This is the error if session is full! Should figure out what to display
    if (getVoterQueryError) return <div>Error getting voter! {getVoterQueryError.message}</div>

    if (!getSessionStateQueryData) {
        return null;
    }
    if (!getVoterQueryData) {
        return null;
    }

    if(!getSessionConfigQueryData) {
        return null;
    }

    if (!getSessionStateQueryData.sessionState) {
        return null;
    }

    const QueueOrPlaylistPopulate = (queueIsEmpty: boolean, isAdmin: boolean) => {
        if (queueIsEmpty) {
            return (
                <PlaylistPopulate sessionID={sessionID} isAdmin={isAdmin}/>
            )
        } else {
            return (
                <Queue sessionID={sessionID} sessionState={getSessionStateQueryData.sessionState} voter={getVoterQueryData.voter} isAdmin={isAdmin} />
            )
        }
    }

    return (
        <div className='session'>
            <div className='music-player-container'>
                <MusicPlayer sessionID={sessionID} currentlyPlaying={getSessionStateQueryData.sessionState.currentlyPlaying} isAdmin={isAdmin(getVoterQueryData.voter)} streamingService={getAccountQueryData?.account.streamingService}/>
                <Separator className='w-full'/>
            </div>
            <div className='queue-container flex relative'>
                <Separator orientation='vertical' className='h-full'/>
                <div className='w-full h-full'>
                    <PurchaseHeader voter={getVoterQueryData.voter} account={getAccountQueryData?.account}/>
                    <Separator/>
                    {QueueOrPlaylistPopulate(getSessionStateQueryData.sessionState.queue === null || getSessionStateQueryData.sessionState.queue?.length === 0, isAdmin(getVoterQueryData.voter))}
                    <SearchBox sessionID={sessionID} />
                </div>
            </div>
            <div className='join-link-container'>
                <JoinLink sessionID={sessionID} numberOfVoters={getSessionStateQueryData.sessionState.numberOfVoters} maximumVoters={getSessionConfigQueryData?.sessionConfig.maximumVoters}></JoinLink>
            </div>
        </div>
        );
}

export default Session;
