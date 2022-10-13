import React from 'react'
import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';

const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const spotifyClientSecret = "efa8b45e4d994eaebc25377afc5a9e8d";

function SpotifyCallback() {
  const [searchParams] = useSearchParams();
  const spotifyCode = searchParams.get("code")

  if (!spotifyCode) {
    console.log("Spotify authorization failed!")
    const error = searchParams.get("Error")
    console.log(error)
  }

  useEffect(() => {
    const processCredentials = async () => {
      const requestOptions = {
        method: "Post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Basic " + Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString("base64")
        },
        body: "grant_type=authorization_code",
        code: spotifyCode
      }
      const rsp = await fetch("https://accounts.spotify.com/api/token", requestOptions);
      if(!rsp.ok){
          console.log(`Request error body: ${await rsp.text()}`);
      } else{
        const rspJson = await rsp.json();
        // setSpotifyAccessToken(rspJson.access_token);
        console.log(rspJson);
    }

    };
    processCredentials();
  }, []);



  return (
    <div>Saving Credentials</div>
  )
}

export default SpotifyCallback