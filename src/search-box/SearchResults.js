import React from "react";
import Song from '../shared-components/Song';

function SearchResults ({ searchResults }) {
    if(!searchResults){
        return null;
    }

    return (
        <div>
            {searchResults.map(song => (
                <Song key={song.id} song={song} />
            ))}  
        </div>  
    );
}

export default SearchResults;