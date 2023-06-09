import './Welcome.css'
import { Link } from 'react-router-dom'
import React from 'react';
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';

const MdFilledButtonComponent = createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButton,
    react: React,
  });

function Welcome() {
    return (
        <>
            <div className='nav-bar'>
                <div>Logo</div>
                <Link className='nav-button' to='/join'>Join Session</Link>
                <Link className='nav-button' to='/register'>Sign Up!</Link>
                <Link className='nav-button' to='/login'>Login</Link>
                <MdFilledButtonComponent onClick={() => {console.log("CLick")}}>test</MdFilledButtonComponent>
            </div>
            <div>Welcome</div>
        </>
    )
}

export default Welcome; 