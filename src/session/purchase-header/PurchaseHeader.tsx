import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Button } from '@/components/ui/button'
import { Coins, Vote } from 'lucide-react'
import BonusVoteOption from './BonusVoteOption'

interface PurchaseHeaderProps {
    numberOfBonusVotes: number,
    voterLevel: string,
    numberOfFazoolTokens: number
}
function PurchaseHeader({numberOfBonusVotes, voterLevel, numberOfFazoolTokens}: PurchaseHeaderProps) {
  return (
    <div className='flex h-[8vh] w-full justify-between'>
        <div className='flex items-center md:justify-start justify-between md:w-1/2 w-full mx-4 gap-4'>
            <Popover>
                <PopoverTrigger>
                    <Button variant={'outline'}>{numberOfBonusVotes} <Vote className='ml-2'/></Button>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col items-center gap-2'>
                    <h1 className='text-xl'>Bonus Votes</h1>
                    <p className='text-xs text-muted-foreground'>Bonus votes allow you to vote for a song after you've used your 1 free vote.</p>
                    <BonusVoteOption numberOfBonusVotes={'10'} costInTokens={'3'}/>
                    <BonusVoteOption numberOfBonusVotes={'20'} costInTokens={'5'}/>
                    <BonusVoteOption numberOfBonusVotes={'50'} costInTokens={'10'}/>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger>
                    <Button variant={'outline'}>{voterLevel}</Button>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col items-center gap-2'>
                    <h1 className='text-xl'>Voter Level</h1>
                    <p className='text-xs text-muted-foreground'>Super voter status allows you to downvote songs and your free vote to count twice</p>
                    <Separator/>
                    <div className='flex justify-between items-center w-full'>
                        <p>Super Voter</p>
                        <div className='flex'>
                            <p>3</p>
                            <Coins className='ml-2'/>
                        </div>
                        <Button>Get</Button>
                    </div>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger>
                    <Button variant={'outline'}>{numberOfFazoolTokens}<Coins className='ml-2'/></Button>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col items-center gap-2'>
                    <h1 className='text-xl'>Fazool Coins</h1>
                    <p className='text-xs text-muted-foreground'>Fazool coins allow you to get access to extra Fazool features</p>
                </PopoverContent>
            </Popover>
        </div>
        <LogoIcon className='w-48 mx-6 md:block hidden'/>
    </div>
  )
}

export default PurchaseHeader