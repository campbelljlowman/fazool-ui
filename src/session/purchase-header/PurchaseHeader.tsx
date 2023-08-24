import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Account, Voter } from '@/gql/graphql'
import { useNavigate, useParams } from 'react-router-dom'
import BonusVoteOptions from './BonusVoteOptions'
import VoterTypeOptions from './VoterTypeOptions'
import FazoolTokenOptions from './FazoolTokenOptions'
import AccountAvater from './AccountAvater'
import { ThemeModeToggle } from '@/website/components/ThemeModeToggle'

interface PurchaseHeaderProps {
    voter:              Voter
    account:            Account | undefined,
}
function PurchaseHeader({voter, account}: PurchaseHeaderProps) {
    const navigate = useNavigate();
    const params = useParams();
    if (!params.sessionID) {
        throw new Error("Unexpected error: Missing sessionID");
    }

    const logoOnClick = () => {
        navigate('/');
    }

    const sessionID = parseInt(params.sessionID)


    return (
        <div className='flex h-[8vh] w-full justify-between'>
            <div className='flex items-center md:justify-start justify-center md:w-1/2 w-full mx-4 gap-4'>
                <BonusVoteOptions sessionID={sessionID} voter={voter} account={account}/>
                <VoterTypeOptions sessionID={sessionID} voter={voter} account={account}/>
                <FazoolTokenOptions sessionID={sessionID} account={account}/>
            </div>
            <div className='flex items-center'>
                <AccountAvater sessionID={sessionID} account={account}/>
                <div className='mr-2'>
                    <ThemeModeToggle/>
                </div>
                <LogoIcon onClick={logoOnClick} className='w-48 mr-6 md:block hidden'/>
            </div>
        </div>
    )
}

export default PurchaseHeader