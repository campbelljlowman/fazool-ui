import React from 'react'
import './Welcome.css'
// import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <div>
            <div className="justify-content-md-center">
                <div xs={8}>
                    <div className='nav-bar'>
                        <div>Logo</div>
                        <Link className='nav-button' to='/join'>Join Session</Link>
                        <Link className='nav-button' to='/register'>Sign Up!</Link>
                        <Link className='nav-button' to='/login'>Login</Link>
                    </div>
                    <div>Welcome</div>
                </div>
            </div>
        </div>
    )
}

export default Welcome; 