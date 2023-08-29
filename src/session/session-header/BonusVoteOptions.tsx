import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Coins, ChevronsUp } from 'lucide-react'
import { bonusVoteCostMapping } from '@/constants'
import { graphql } from '../../gql';
import { useMutation } from '@apollo/client';
import { Account, BonusVoteAmount, Voter } from '@/gql/graphql'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { ButtonStyledP } from '@/components/ui/button-styled-p';

const ADD_BONUS_VOTES = graphql(`
    mutation addBonusVotes($sessionID: Int!, $targetAccountID: Int!, $bonusVoteAmount: BonusVoteAmount!) {
        addBonusVotes(sessionID: $sessionID, targetAccountID: $targetAccountID, bonusVoteAmount: $bonusVoteAmount) {
            fazoolTokens
        }
    }
`);

interface BonusVoteOptionProps {
    numberOfBonusVotes: number,
    costInTokens:       number,
    variant:            "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    addBonusVotes:      () => void
    disabled:           boolean
}
function BonusVoteOption({ numberOfBonusVotes, costInTokens, variant, addBonusVotes, disabled}: BonusVoteOptionProps) {
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
                    <Dialog>
                        <DialogTrigger>
                                <ButtonStyledP variant={'outline'}>Get</ButtonStyledP>
                        </DialogTrigger>
                        <DialogContent className='flex flex-col items-center '>
                            <DialogHeader>
                                <DialogTitle>
                                    Confirm Puchase
                                </DialogTitle>
                                <DialogDescription>
                                    Confirm purchase of {numberOfBonusVotes} bonus votes for {costInTokens} Fazool tokens
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose disabled={disabled} onClick={addBonusVotes} className='disabled:pointer-events-none disabled:opacity-50'>
                                    <ButtonStyledP>Get</ButtonStyledP>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

interface BonusVoteOptionsProps {
    sessionID:  number,
    voter:      Voter
    account:    Account | undefined,
}
function BonusVoteOptions ({sessionID, voter, account}: BonusVoteOptionsProps) {
    const [addBonusVotesMutation, { error: addBonusVotesMutationError }] = useMutation(ADD_BONUS_VOTES, {
        refetchQueries: [
            'getAccount',
            'voter'
        ]
    });

    const addBonusVotes = (bonusVoteAmount: BonusVoteAmount) => {
        addBonusVotesMutation({ variables: {sessionID: sessionID, targetAccountID: account!.id, bonusVoteAmount: bonusVoteAmount}})
    }

    if (addBonusVotesMutationError) console.log(`Error adding bonus votes: ${addBonusVotesMutationError}`)

    return (
        <Popover>
            <PopoverTrigger>
                <ButtonStyledP variant={'outline'}>{voter.bonusVotes} <ChevronsUp className='ml-2'/></ButtonStyledP>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col items-center gap-2'>
                <h1 className='text-xl'>Bonus Votes</h1>
                <p className='text-xs text-muted-foreground'>Bonus votes allow you to vote for a song after you've used your one free vote. 
                Bonus votes for songs that don't get played are returned at the end of a session</p>
                {bonusVoteCostMapping.map(bonusVoteOption => (
                    <BonusVoteOption key={bonusVoteOption.NumberOfBonusVotes} numberOfBonusVotes={bonusVoteOption.NumberOfBonusVotes} costInTokens={bonusVoteOption.CostInFazoolTokens} variant={'outline'} addBonusVotes={() => addBonusVotes(bonusVoteOption.BonusVoteAmount)} disabled={account == undefined}/>
                ))}
                {addBonusVotesMutationError && <p className='text-destructive'>{addBonusVotesMutationError.message}</p>}
            </PopoverContent>
        </Popover>
    )
}

export default BonusVoteOptions