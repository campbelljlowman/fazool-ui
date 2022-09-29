import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";


const CREATE_SESSION = gql`
mutation createSession($userID: Int!) {
  createSession(userID:$userID){
    sessionID
  }
}
`

function Home() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [createSessionMutation, { error }] = useMutation(CREATE_SESSION, {
    onCompleted(data){
      console.log(data);
      user.sessionID = data.createSession.sessionID;
    }
  });

  const createSession = () => {
    createSessionMutation({ variables: {userID: user.id}});
  }

  const launchSession = (e) => {
    e.preventDefault();
    navigate(`/session/${user.sessionID}`);  }

  if (error) return `Error! ${error.message}`;

  if(!user){
    return "Please register or login";
  }

  const sessionInfo = () => {
    if (user.sessionID === 0){
      return (
        <div>
          <div>No Current Session</div>
          <button onClick={createSession}>Create</button>
        </div>
      )
    } else {
      return (
        <div>
          <div>Current Session: {user.sessionID}</div>
          <button onClick={launchSession}>Launch</button>
        </div>
      )
    }
  }

  return (
    <div>
      <div>Home</div>
      <div>Welcome {user.firstName}</div>
      <div>{sessionInfo()}</div>
    </div>
  )
}

export default Home