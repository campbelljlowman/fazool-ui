import MusicPlayer from './music-player/MusicPlayer'
import Queue from './queue/Queue'
import Ad from './ads/Ad'
import JoinLink from './join-sidebar/JoinLink'
import './Session.css'
import SearchBox from './search-box/SearchBox'
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { graphql } from '../gql'
import { Voter, VoterType } from '../gql/graphql'


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
            numberOfVoters
        }
    }
`);

const GET_SESSION_CONFIG = graphql(`
    query getSessionConfig($sessionID: Int!){
        sessionConfig(sessionID: $sessionID){
            id
            adminAccountID
            maximumVoters
        }
    }
`);


const GET_VOTER = graphql(`
    query voter ($sessionID: Int!){
        voter (sessionID: $sessionID){
            id
            type
            songsUpVoted
            songsDownVoted
            bonusVotes
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

    const { subscribeToMore, error: getSessionStateQueryError, data: getSessionStateQueryData } = useQuery(GET_SESSION_STATE, {
        variables: { sessionID: sessionID },
    });

    const { data: getSessionConfigData } = useQuery(GET_SESSION_CONFIG, {variables: { sessionID: sessionID }});

    useEffect(() => {
        const checkForVoterToken = () => {
            if (sessionStorage.getItem('voter-token') == null) {
            navigate("/join");
            }
        };
        checkForVoterToken();
    }, []);

    useEffect(() => {
        const subscribeToSession = () => {
            subscribeToMore({
                document: SUBSCRIBE_SESSION_STATE,
                variables: { sessionID: sessionID },
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
    // TODO: This is the error if session is full! Should figure out what to display
    if (getVoterQueryError) return <div>Error getting voter! {getVoterQueryError.message}</div>

    if (!getSessionStateQueryData) {
        return null;
    }
    if (!getVoterQueryData) {
        return null;
    }

    if (!getSessionStateQueryData.sessionState) {
        return null;
    }

    return (
        <div className='session'>
            <div className='music-player-container'>
                <MusicPlayer sessionID={sessionID} currentlyPlaying={getSessionStateQueryData.sessionState.currentlyPlaying} showMediaButtons={isAdmin(getVoterQueryData.voter)} />
            </div>
            <div className='queue-container'>
                <Queue sessionID={sessionID} sessionState={getSessionStateQueryData.sessionState} voter={getVoterQueryData.voter} />
                <SearchBox sessionID={sessionID} />
            </div>
            <div className='join-link-container'>
                <JoinLink></JoinLink>
            </div>
        </div>
        );
}

export default Session;
