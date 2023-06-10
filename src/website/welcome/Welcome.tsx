import './Welcome.css'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';
import { MdOutlinedButton } from '@material/web/button/outlined-button';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import SessionMockup from '../../assets/images/session-mock-up.png'

const MdFilledButtonComponent = createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButton,
    react: React,
});

const MdOutlinedButtonComponent = createComponent({
    tagName: 'md-outlined-button',
    elementClass: MdOutlinedButton,
    react: React,
});

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className='welcome-page'>
            <div className='navigation-header'>
                <LogoIcon className='logo-wrapper'/>
                <div>
                    <MdOutlinedButtonComponent className='navigation-button' onClick={() => {navigate("/join");}}>Join Session</MdOutlinedButtonComponent>
                    <MdFilledButtonComponent className='navigation-button' onClick={() => {navigate("/register");}}>Sign Up</MdFilledButtonComponent>
                    <MdOutlinedButtonComponent className='navigation-button' onClick={() => {navigate("/login");}}>Login</MdOutlinedButtonComponent>
                </div>
            </div>
            <div className='body-block-1'>
                <div className='body-block-1-text'>
                    <h1 className='display-medium' style={{padding: '0.5rem'}}>Democratized DJing</h1>
                    <p className='headline-small' style={{padding: '0.5rem'}}>Fazool allows a group of people to vote on what songs get played.</p>
                    <ul style={{padding: '0.5rem'}}>
                        <li className='title-medium' style={{listStylePosition: 'inside'}}>Connects with popular streaming services</li>
                        <li className='title-medium' style={{listStylePosition: 'inside'}}>Basic functionality is completely free</li>
                        <li className='title-medium' style={{listStylePosition: 'inside'}}>No account required for voters</li>
                    </ul>
                </div>
                <div>
                    <img className='session-mockup' src={SessionMockup} alt='Mock up of a Fazool session'/>
                </div>
            </div>
        </div>
    )
}

export default Welcome; 