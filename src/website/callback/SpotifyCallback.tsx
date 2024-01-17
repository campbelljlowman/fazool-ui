import { Buffer } from 'buffer';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { graphql } from '../../gql';


const SET_SPOTIFY_STREAMING_SERVICE = graphql(`
    mutation setSpotifyStreamingService ($spotifyRefreshToken: String!) {
        setSpotifyStreamingService(spotifyRefreshToken: $spotifyRefreshToken){
            id
        }
    }
`);

const spotifyClientId = `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}`
const spotifyClientSecret = `${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
// TODO: find a way to not have to hard code its own address
const redirectURI = `${import.meta.env.VITE_FRONTEND_SERVER_HTTP_ADDRESS}/callback`

function SpotifyCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const spotifyCode = searchParams.get("code")
    if (!spotifyCode) {
        const error = searchParams.get("Error")
        console.log(`Error updating spotify authorication: ${error}`)
        // TODO: Figure out what to do if this is null
        return null
    }

    const [upsertSpotifyCredentialsMutation, { error: upsertSpotifyCredentialsMutationError }] = useMutation(SET_SPOTIFY_STREAMING_SERVICE, {
        onCompleted() {
            navigate("/home");
        }
    });

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
                upsertSpotifyCredentialsMutation({ variables: { spotifyRefreshToken: rspJson.refresh_token } });
            }
        };
        processCredentials();
    }, []);


    if (upsertSpotifyCredentialsMutationError) return <div>Error! {upsertSpotifyCredentialsMutationError.message}</div>

    return (
        <div>Saving Credentials</div>
    )
}

export default SpotifyCallback