import React,  { useState, useEffect, useCallback } from 'react';
import {Buffer} from 'buffer';
import { Button } from 'react-bootstrap';
import SearchResults from './SearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

import './SearchBox.css'

function SearchBox () {
    const spotifyClientId = "a7666d8987c7487b8c8f345126bd1f0c";
    const spotifyClientSecret = "efa8b45e4d994eaebc25377afc5a9e8d";
    const [searchValue, setSearchValue] = useState("");
    const [spotifyAccessToken, setSpotifyAccessToken] = useState();
    const [searchResults, setSearchResults] = useState();

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    // TODO: Cache this value somehow. Currently it gets a new token every time it rerenders
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

    const searchForSong = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "Get",
            headers: {
                // 'Content-Type': 'application/json',
                "Authorization": "Bearer " + spotifyAccessToken
            },
        }
        const rsp = await fetch(`https://api.spotify.com/v1/search?type=track&limit=5&q=${searchValue}`, requestOptions);
        if(!rsp.ok){
            console.log(`Request return code: ${rsp.status}`);
            console.log(`Request error body: ${await rsp.text()}`);
        }
        const rspJson = await rsp.json();
        const songs = await rspJson.tracks.items;
        // console.log(songs);
        // TODO: Loop through artists names
        const songObjects = []
        songs.forEach(e => {
            const song = {
                'id': e.id,
                'title': e.name,
                'artist': e.artists[0].name,
                'image': e.album.images[0].url
            }
            songObjects.push(song);
        });
        // console.log(songObjects);
        setSearchResults(songObjects);
    }

    useEffect(() => {
        getClientToken();
    }, [getClientToken]);

    return(
        <div className='search-box'>
        <form>
            {/* <label>
                Song:
            </label> */}
            <input type="text" placeholder="Song" value={searchValue} onChange={handleChange} /> 
            <button className="transparent-button" onClick={searchForSong}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
        </form>
        <SearchResults searchResults={searchResults} />
        </div>
    );
}

export default SearchBox