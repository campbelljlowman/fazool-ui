import { Buffer } from 'buffer';
import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { useMutation } from '@apollo/client'
import { graphql } from '../../gql'


const UPSERT_SPOTIFY_CREDENTIALS = graphql(`
  mutation upsertSpotifyCredentials ($spotifyCreds: SpotifyCreds!) {
    upsertSpotifyToken(spotifyCreds:$spotifyCreds){
        id
    }
  }
`)

const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
const spotifyClientSecret = "efa8b45e4d994eaebc25377afc5a9e8d";
// TODO: find a way to not have to hard code its own address
const redirectURI = 'http://localhost:5173/callback'

function SpotifyCallback() {
    const [searchParams] = useSearchParams();
    const spotifyCode = searchParams.get("code")
    if (!spotifyCode) {
        // TODO: Figure out what to do if this is null
        return null
    }

    const [updateSpotifyCredsMutation, { error: mutationError }] = useMutation(UPSERT_SPOTIFY_CREDENTIALS, {
        onCompleted(data) {
            console.log(data);
            // TODO: Nav to back to account page
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
                body: new URLSearchParams({
                    'grant_type': 'authorization_code',
                    'code': spotifyCode,
                    'redirect_uri': redirectURI
                })
            }
            const rsp = await fetch("https://accounts.spotify.com/api/token", requestOptions);
            if (!rsp.ok) {
                console.log(`Request error body: ${await rsp.text()}`);
            } else {
                const rspJson = await rsp.json();
                console.log(rspJson);
                const spotifyCreds = {
                    "accessToken": rspJson.access_token,
                    "refreshToken": rspJson.refresh_token
                }
                updateSpotifyCredsMutation({ variables: { spotifyCreds: spotifyCreds } });
            }
        };
        processCredentials();
    });


    if (mutationError) return <div>Error! {mutationError.message}</div>

    return (
        <div>Saving Credentials</div>
    )
}

export default SpotifyCallback