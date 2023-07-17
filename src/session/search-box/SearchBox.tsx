import React, { useState } from 'react';
import SearchResults from './SearchResults';
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../../gql';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


const MUSIC_SEARCH  = graphql(`
    query musicSearch ($sessionID: Int!, $query: String!){
        musicSearch (sessionID: $sessionID, query: $query){
            id
            title
            artist
            image
        }
    }
`);

interface SearchBoxProps {
    sessionID: number
};

function SearchBox({ sessionID }: SearchBoxProps) {
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [searchResultQuery, { data: searchResultsQueryData, error: searchResultQueryError }] = useLazyQuery(MUSIC_SEARCH , {
        variables: {
            sessionID: sessionID,
            query: searchQuery
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchQuery(e.target.value);
    }

    const searchForSong = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(searchQuery !== "") {
            searchResultQuery();
            setShowSearchResults(true)
        }
    }

    if (searchResultQueryError) {
        console.log("Error executing search: " + searchResultQueryError)
    }

    const clearSearchResults = () => {
        setShowSearchResults(false);
        // TODO: This causes errors somehow
        // setSearchQuery("");
    };
    
    const displaySearchResults  = () => {
        if (showSearchResults && searchResultsQueryData) {
            return <SearchResults searchResults={searchResultsQueryData.musicSearch} clearSearchResults={clearSearchResults} />;
        } else {
            return null;
        }
    }

    return (
        <div>
            <Separator className='w-full'/>
            <div className='flex items-center justify-between w-full'>
                <div className='w-full flex justify-center'>
                    <form className="flex w-full max-w-sm items-center space-x-2 grow-[4]">
                        <Input type="email" placeholder="Song" value={searchQuery} onChange={handleChange}/>
                        <Button variant={'ghost'} type="submit" onClick={searchForSong}><Search className='h-8 w-8'/></Button>
                    </form>
                </div>
                <LogoIcon className='w-48 mx-6'/>
                {displaySearchResults()}
            </div>
        </div>
    );
}

export default SearchBox