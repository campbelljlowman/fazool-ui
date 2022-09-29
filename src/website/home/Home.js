import React from 'react'

function Home({ user }) {

  const createSession = () => {
    console.log("create session")
  }
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
      return <div>session</div>
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