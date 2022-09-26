import React from 'react'

function Home({ user }) {

  if(!user){
    return "Please register or login";
  }

  return (
    <div>
      <div>Home</div>
      <div>Welcome {user.firstName}</div>
    </div>
  )
}

export default Home