import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'

interface BonusVoteOptionProps {
    numberOfBonusVotes: string,
    costInTokens: string
}
function BonusVoteOption({ numberOfBonusVotes, costInTokens}: BonusVoteOptionProps) {
  return (
    <>
        <Separator/>
        <div className='flex justify-between items-center w-full'>
            <p>{numberOfBonusVotes} Bonus Votes</p>
            <div className='flex'>
                <p>{costInTokens}</p>
                <Coins className='ml-2'/>
            </div>
            <Button>Get</Button>
        </div>
    </>
  )
}

export default BonusVoteOption