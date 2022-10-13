import React from 'react'
import { useSearchParams } from "react-router-dom";
 
function SpotifyCallback() {
  const [searchParams] = useSearchParams();

  console.log(searchParams)
  console.log(searchParams.get("code"))
  
  return (
    <div>SpotifyCallback</div>
  )
}

export default SpotifyCallback