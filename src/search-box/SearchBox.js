import React,  { useState, useEffect, useCallback } from 'react'
import {Buffer} from 'buffer'

function SearchBox () {
    const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
    const spotifyClientSecret = "efa8b45e4d994eaebc25377afc5a9e8d";
    const [searchValue, setSearchValue] = useState();
    const [spotifyAccessToken, setSpotifyAccessToken] = useState();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const getClientToken = useCallback(async () => {
        const requestOptions = {
            method: "Post",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": "Basic " + Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString("base64")
            },
            body: "grant_type=client_credentials",
        }
        const rsp = await fetch("https://accounts.spotify.com/api/token", requestOptions);
        if(!rsp.ok){
            console.log(`Request return code: ${rsp.status}`);
            console.log(`Request error body: ${await rsp.text()}`);
        }
        const rspJson = await rsp.json();
        setSpotifyAccessToken(rspJson.access_token);
        console.log(rspJson.access_token);
    }, []) 

    useEffect(() => {
        getClientToken();
    }, [getClientToken]);

    // Create funciton to get spotify client access token
    // On startup, check for access token in local storage
    // If no token, use function to get token, store in local storage and state
    // If token in localstorage, check it's valid. If not, refresh

    return(
        <form>
            {/* <label>
                Song:
            </label> */}
            <input type="text" placeholder="Song" value={searchValue} onChange={handleChange} /> 
        </form>
    );
}

export default SearchBox