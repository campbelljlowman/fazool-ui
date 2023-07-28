import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'

interface BonusVoteOptionProps {
    numberOfBonusVotes: number,
    costInTokens: number,
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}
function BonusVoteOption({ numberOfBonusVotes, costInTokens, variant}: BonusVoteOptionProps) {
  return (
    <>
        <Separator/>
        <div className='flex justify-between items-center w-full'>
            <p>{numberOfBonusVotes} Bonus Votes</p>
            <div className='flex items-center gap-2'>
                <div className='flex'>
                    <p>{costInTokens}</p>
                    <Coins className='ml-2'/>
                </div>
                <Button variant={variant}>Get</Button>
            </div>
        </div>
    </>
  )
}

export default BonusVoteOption