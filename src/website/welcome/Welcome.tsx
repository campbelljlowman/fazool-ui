import './Welcome.css'
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <>
            <div className='nav-bar'>
                <div>Logo</div>
                <Link className='nav-button' to='/join'>Join Session</Link>
                <Link className='nav-button' to='/register'>Sign Up!</Link>
                <Link className='nav-button' to='/login'>Login</Link>
            </div>
            <div>Welcome</div>
        </>
    )
}

export default Welcome; 