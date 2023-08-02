import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Coins } from 'lucide-react'
import FazoolTokenOption from './FazoolTokenOptions'
import { Account, Voter } from '@/gql/graphql'
import { useNavigate, useParams } from 'react-router-dom'
import BonusVoteOptions from './BonusVoteOptions'
import VoterTypeOptions from './VoterTypeOptions'
import FazoolTokenOptions from './FazoolTokenOptions'
import AccountAvater from './AccountAvater'


interface PurchaseHeaderProps {
    voter:              Voter
    account:            Account | undefined,
}
function PurchaseHeader({voter, account}: PurchaseHeaderProps) {
    const params = useParams();
    if (!params.sessionID) {
        throw new Error("Unexpected error: Missing sessionID");
    }

    const sessionID = parseInt(params.sessionID)


    return (
        <div className='flex h-[8vh] w-full justify-between'>
            <div className='flex items-center md:justify-start justify-center md:w-1/2 w-full mx-4 gap-4'>
                <BonusVoteOptions sessionID={sessionID} voter={voter} account={account}/>
                <VoterTypeOptions sessionID={sessionID} voter={voter} account={account}/>
                <FazoolTokenOptions account={account}/>
            </div>
            <div className='flex items-center'>
                <AccountAvater sessionID={sessionID} account={account}/>
                <LogoIcon className='w-48 mr-6 md:block hidden'/>
            </div>
        </div>
    )
}

export default PurchaseHeader