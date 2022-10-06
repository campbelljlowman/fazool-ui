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
mutation createSession($userID: Int!) {
  createSession(userID:$userID){
    sessionID
  }
}
`

function Home() {
  const navigate = useNavigate();
  const {loading, queryError, data} = useQuery(GET_USER);
  const [createSessionMutation, { mutationError }] = useMutation(CREATE_SESSION, {
    onCompleted(data){
      console.log(data);
      data.sessionID = data.createSession.sessionID;
    }
  });

  const createSession = () => {
    createSessionMutation({ variables: {userID: data.user.id}});
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
          <button onClick={createSession}>Create</button>
        </div>
      )
    } else {
      return (
        <div>
          <div>Current Session: {data.user.sessionID}</div>
          <button onClick={launchSession}>Launch</button>
        </div>
      )
    }
  }

  return (
    <div>
      <div>Home</div>
      <div>Welcome {data.user.firstName}</div>
      <div>{sessionInfo()}</div>
    </div>
  )
}

export default Home