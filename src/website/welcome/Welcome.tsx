import './Welcome.css'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';
import { MdOutlinedButton } from '@material/web/button/outlined-button';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'

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
            <div className='display-small'>Welcome</div>
        </div>
    )
}

export default Welcome; 