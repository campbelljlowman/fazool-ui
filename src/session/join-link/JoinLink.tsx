import JoinQRCode from '../../assets/images/join-qr-code.png'
import './JoinLink.css'

interface JoinLinkProps {
    sessionID: number,
    numberOfVoters: number,
    maximumVoters: number
}
function JoinLink({ sessionID, numberOfVoters, maximumVoters}: JoinLinkProps) {
    return (
        <div className='join-link'>
            <div className='number-of-voters'>{numberOfVoters}/{maximumVoters} Voters</div>
            <div>Scan to join!</div>
            <div>Free, no account required</div>
            <img className='qr-code' src={JoinQRCode} alt='QR code link to fazool.party' />
            <div>fazool.party</div>
            <div className='session-id'>Session {sessionID}</div>
        </div>
    );
}

export default JoinLink;