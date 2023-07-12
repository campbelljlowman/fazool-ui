import './Welcome.css'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';
import { MdOutlinedButton } from '@material/web/button/outlined-button';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Button } from "@/components/ui/button"
import SessionMockup from '../../assets/images/session-mock-up.png'
import HowItWorksCard from './HowItWorksCard';

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
            <div className='margin-top'></div>
            <div className='navigation-header'>
                <LogoIcon className='logo-wrapper'/>
                <div className='navigation-buttons-wrapper'>
                    <Button>Button!</Button>
                    <MdOutlinedButtonComponent className='navigation-button' onClick={() => {navigate("/join");}}>Join Session</MdOutlinedButtonComponent>
                    <MdFilledButtonComponent className='navigation-button' onClick={() => {navigate("/register");}}>Sign Up</MdFilledButtonComponent>
                    <MdOutlinedButtonComponent className='navigation-button' onClick={() => {navigate("/login");}}>Login</MdOutlinedButtonComponent>
                </div>
            </div>
            <div className='body-block-1'>
                <div className='body-block-1-text'>
                    <h1 className='display-medium' style={{padding: '0.5rem'}}>Democratized DJing</h1>
                    <p className='headline-small' style={{padding: '0.5rem'}}>Fazool allows a group of people to vote on which songs get played.</p>
                    <ul style={{padding: '0.5rem'}}>
                        <li className='title-medium' style={{listStylePosition: 'inside', lineHeight: '1.5'}}>Connects with popular streaming services</li>
                        <li className='title-medium' style={{listStylePosition: 'inside', lineHeight: '1.5'}}>Basic functionality is completely free</li>
                        <li className='title-medium' style={{listStylePosition: 'inside', lineHeight: '1.5'}}>No account required for voters</li>
                    </ul>
                </div>
                <div>
                    <img className='session-mockup' src={SessionMockup} alt='Mock up of a Fazool session'/>
                </div>
            </div>
            <div className='body-block-2'>
                <div>
                    <div className='how-it-works-card-row'>
                        <HowItWorksCard title='Connect' description='Connect Fazool to your favorite music streaming service. Currently supported ones include Spotify' icon='link'/>
                        <HowItWorksCard title='Host' description='Start a Fazool session and display it on a screen where everyone can see' icon='desktop_windows'/>
                    </div>
                    <div className='how-it-works-card-row'>
                        <HowItWorksCard title='Join' description='Anyone can join a Fazool session on their phone. Then they can view and vote for songs they want to hear' icon='flip'/>
                        <HowItWorksCard title='Listen' description='Fazool will make sure the most popular songs get played!' icon='music_note'/>
                    </div>
                </div>
                <div className='display-medium'>
                    How does Fazool work?
                </div>
            </div>
        </div>
    )
}

export default Welcome; 