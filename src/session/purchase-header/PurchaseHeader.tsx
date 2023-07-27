import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Button } from '@/components/ui/button'
import { Coins, Vote } from 'lucide-react'
import BonusVoteOption from './BonusVoteOption'
import FazoolTokenOption from './FazoolTokenOption'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Account } from '@/gql/graphql'
import { useNavigate } from 'react-router-dom'


interface PurchaseHeaderProps {
    numberOfBonusVotes: number,
    voterType: string,
    account: Account | undefined
}
function PurchaseHeader({numberOfBonusVotes, voterType, account}: PurchaseHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className='flex h-[8vh] w-full justify-between'>
            <div className='flex items-center md:justify-start justify-center md:w-1/2 w-full mx-4 gap-4'>
                <Popover>
                    <PopoverTrigger>
                        <p className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            {numberOfBonusVotes} <Vote className='ml-2'/>
                        </p>
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col items-center gap-2'>
                        <h1 className='text-xl'>Bonus Votes</h1>
                        <p className='text-xs text-muted-foreground'>Bonus votes allow you to vote for a song after you've used your one free vote.</p>
                        <BonusVoteOption numberOfBonusVotes={'10'} costInTokens={'3'} variant={'outline'}/>
                        <BonusVoteOption numberOfBonusVotes={'25'} costInTokens={'6'} variant={'default'}/>
                        <BonusVoteOption numberOfBonusVotes={'50'} costInTokens={'10'} variant={'outline'}/>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger>
                        <p className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            {`${voterType.slice(0, 1)}${voterType.slice(1).toLowerCase()}`}
                        </p>
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col items-center gap-2'>
                        <h1 className='text-xl'>Voter Type</h1>
                        <p className='text-xs text-muted-foreground'>Super voter status allows you to downvote songs and your free vote to count twice</p>
                        <Separator/>
                        <div className='flex justify-between items-center w-full'>
                            <p>Super Voter</p>
                            <div className='flex items-center gap-2'>
                                <div className='flex'>
                                    <p>3</p>
                                    <Coins className='ml-2'/>
                                </div>
                                <Button>Get</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger>
                        {account ? <p className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            {account.fazoolTokens}<Coins className='ml-2'/>
                        </p>
                        :
                        <p className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            0<Coins className='ml-2'/>
                        </p>
                        }
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col items-center gap-2'>
                        <h1 className='text-xl'>Fazool Tokens</h1>
                        <p className='text-xs text-muted-foreground'>Fazool tokens allow you to get access to extra Fazool features like super voter status and bonus votes</p>
                        {account ? 
                            <>
                                <FazoolTokenOption accountID={account.id} numberOfFazoolTokens={5} costInDollars='5' variant={'outline'} />
                                <FazoolTokenOption accountID={account.id} numberOfFazoolTokens={12} costInDollars='10' variant={'default'} />
                                <FazoolTokenOption accountID={account.id} numberOfFazoolTokens={25} costInDollars='20' variant={'outline'} />
                            </>
                            :
                            <div className='flex'>
                                <Button className='m-3' onClick={() => {navigate("/register");}}>Sign Up</Button>
                                <Button className='m-3' variant={'secondary'} onClick={() => {navigate("/login");}}>Login</Button>
                            </div>
                        }
                    </PopoverContent>
                </Popover>
                {account?.firstName && 
                <Avatar>
                    <AvatarFallback>
                        {Array.from(account.firstName)[0].toUpperCase()}
                        {account.lastName && Array.from(account.lastName)[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>}
            </div>
            <LogoIcon className='w-48 mx-6 md:block hidden'/>
        </div>
    )
}

export default PurchaseHeader