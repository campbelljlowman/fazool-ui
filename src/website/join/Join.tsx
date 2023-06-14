import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../../gql'
import './Join.css'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';

const MdFilledButtonComponent = createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButton,
    react: React,
});

const GET_VOTER_TOKEN = graphql(`
    query getVoterToken {
        voterToken
    }
`);

function Join() {
    const navigate = useNavigate();
    const [sessionID, setSessionID] = useState("");

    const [getVoterTokenQuery, { error: getVoterTokenQueryError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.voterToken);
            navigate(`/session/${sessionID}`);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSessionID(e.target.value);
    }

    const joinSession = (e: React.MouseEvent<MdFilledButton>) => {
        e.preventDefault();
        getVoterTokenQuery();
        
    }

    if (getVoterTokenQueryError) console.log(`Error joining voters: ${getVoterTokenQueryError.message}`)

    return (
        <div className='join-page'>
                <LogoIcon className='logo-wrapper-main'/>
                <div className='join-forms-card'> 
                    <h1 className='display-small'>Log In</h1>

                    <input className='input-field' type="text" placeholder="Session ID" value={sessionID} onChange={handleChange} />
                    <MdFilledButtonComponent className='navigation-button' onClick={joinSession}>Log In</MdFilledButtonComponent>   
                </div>
        </div>
        // <>
        //     <div>Join Session!</div>
        //     <form>
        //         <input type="text" placeholder="Session ID" value={sessionID} onChange={handleChange} />
        //         <button className="transparent-button" onClick={joinSession}>Join</button>
        //     </form>
        // </>
    )
}

export default Join