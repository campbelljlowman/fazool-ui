import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";

const GET_USER = gql`
query getUser {
  user{
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
  const {loading, error: queryError, data} = useQuery(GET_USER);
  const [createSessionMutation, { error: mutationError }] = useMutation(CREATE_SESSION, {
    onCompleted(data){
      console.log(data);
      data.sessionID = data.createSession.sessionID;
    },
    refetchQueries: [
      {query: GET_USER}
    ]
  });

  const createSession = () => {
    createSessionMutation();
  }

  const launchSession = (e) => {
    e.preventDefault();
    navigate(`/session/${data.user.sessionID}`);  
  }

  if (loading) return 'Loading...';
  if (mutationError) return `Error! ${mutationError.message}`;
  if (queryError) return `Error! ${queryError.message}`;
    
  if(!data){
    console.log(data);
    return "Please register or login";
  }

  const sessionInfo = () => {
    if (data.user.sessionID === 0){
      return (
        <div>
          <div>No Current Session</div>
          <button onClick={createSession}>Create Session</button>
        </div>
      )
    } else {
      return (
        <div>
          <div>Current Session: {data.user.sessionID}</div>
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
      <div>Welcome {data.user.firstName}</div>
      <div>{sessionInfo()}</div>
      <div>{spotifyInfo()}</div>
    </div>
  )
}

export default Home