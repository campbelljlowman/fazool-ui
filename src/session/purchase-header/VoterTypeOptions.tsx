import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { superVoterCost } from '../../constants'
import { graphql } from '../../gql';
import { useMutation } from '@apollo/client';
import { Voter, Account } from '@/gql/graphql'


const SET_SUPER_VOTER_SESSION = graphql(`
    mutation setSuperVoterSession($sessionID: Int!, $targetAccountID: Int!) {
        setSuperVoterSession(sessionID: $sessionID, targetAccountID: $targetAccountID) {
            fazoolTokens
        }
    }
`);

interface VoterTypeOptionsProps {
    sessionID:  number,
    voter:      Voter
    account:    Account | undefined,
}
function VoterTypeOptions({sessionID, voter, account}: VoterTypeOptionsProps) {   
    const [setSuperVoterSessionMutation, { error: setSuperVoterSessionMutationError }] = useMutation(SET_SUPER_VOTER_SESSION, {
        refetchQueries: [
            'getAccount',
            'voter'
        ]
    });

    const setSuperVoterSession = () => {
        setSuperVoterSessionMutation({ variables: {targetAccountID: account!.id, sessionID: sessionID}})
    }

    if (setSuperVoterSessionMutationError) console.log(`Error setting super voter: ${setSuperVoterSessionMutationError}`)

    return (
        <Popover>
            <PopoverTrigger>
                <p className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    {`${voter.type.slice(0, 1)}${voter.type.slice(1).toLowerCase()}`}
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
                            <p>{superVoterCost}</p>
                            <Coins className='ml-2'/>
                        </div>
                        <Button onClick={setSuperVoterSession}>Get</Button>
                    </div>
                </div>
                {setSuperVoterSessionMutationError && <p className='text-destructive'>{setSuperVoterSessionMutationError.message}</p>}
            </PopoverContent>
        </Popover>
    )
}

export default VoterTypeOptions