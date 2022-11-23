import React from 'react'
import {Buffer} from 'buffer';
import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';


const UPSERT_SPOTIFY_CREDENTIALS = gql`
  mutation upsertSpotifyCredentials ($spotifyCreds: SpotifyCreds!) {
    upsertSpotifyToken(spotifyCreds:$spotifyCreds){
        id
    }
  }
`;

const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const spotifyClientSecret = "efa8b45e4d994eaebc25377afc5a9e8d";
const redirectURI = 'http://localhost:3000/callback'

function SpotifyCallback() {
  const [searchParams] = useSearchParams();
  const spotifyCode = searchParams.get("code")
  const [updateSpotifyCredsMutation, { mutationError }] = useMutation(UPSERT_SPOTIFY_CREDENTIALS, {
    onCompleted(data){
      console.log(data);
      // TODO: Nav to back to user page
    }
  });

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
        body: new URLSearchParams ({
          'grant_type': 'authorization_code',
          'code': spotifyCode,
          'redirect_uri': redirectURI
        })
      }
      const rsp = await fetch("https://accounts.spotify.com/api/token", requestOptions);
      if(!rsp.ok){
          console.log(`Request error body: ${await rsp.text()}`);
      } else{
        const rspJson = await rsp.json();
        console.log(rspJson);
        const spotifyCreds = {
          "accessToken": rspJson.access_token,
          "refreshToken": rspJson.refresh_token
        }
        updateSpotifyCredsMutation({variables: {spotifyCreds: spotifyCreds}});
      }
    };
    processCredentials();
  });


  if (mutationError) return `Error! ${mutationError.message}`;

  return (
    <div>Saving Credentials</div>
  )
}

export default SpotifyCallback