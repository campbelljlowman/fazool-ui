import React from 'react';
import LogoMaroon from "../../assets/LogoMaroon.svg";
import './JoinSidebar.css'

function JoinSidebar({ currentNumberOfVoters, maxNumberOfVoters }) {
    return (
        <div className='join-sidebar'>
            <div className='logo-wrapper'>
                <img className='logo' src={LogoMaroon}/>
            </div>
            <div className='number-of-voters'>
                {currentNumberOfVoters}/{maxNumberOfVoters} Voters
            </div>
        </div>
    );
}

export default JoinSidebar;