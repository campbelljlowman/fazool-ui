import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { superVoterCost } from '../../constants'
import { graphql } from '../../gql';
import { useMutation } from '@apollo/client';
import { Voter, Account } from '@/gql/graphql'
import { toLowerCaseBesidesFirst } from '@/utils'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

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
                    {toLowerCaseBesidesFirst(voter.type)}
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
                        <Dialog>
                            <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                Get
                            </DialogTrigger>
                            <DialogContent className='flex flex-col items-center '>
                                <DialogHeader>
                                    <DialogTitle>
                                        Confirm Puchase
                                    </DialogTitle>
                                    <DialogDescription>
                                        Confirm purchase of super voter status for {superVoterCost} Fazool tokens
                                    </DialogDescription>
                                    {/* <DialogTitle>
                                        <p className='text-center'>
                                            Confirm purchase of Super Voter status for {superVoterCost} Fazool tokens
                                        </p>
                                    </DialogTitle> */}
                                </DialogHeader>
                                <DialogClose>
                                    <DialogFooter>
                                        <Button disabled={account == undefined} onClick={setSuperVoterSession}>Get</Button>
                                    </DialogFooter>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {setSuperVoterSessionMutationError && <p className='text-destructive'>{setSuperVoterSessionMutationError.message}</p>}
            </PopoverContent>
        </Popover>
    )
}

export default VoterTypeOptions