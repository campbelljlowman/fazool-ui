import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'
import { graphql } from '../../gql';
import { useMutation } from '@apollo/client';

const GET_ACCOUNT = graphql(`
    query getAccount {
        account {
            id
            firstName
            lastName
            activeSession
            streamingService
            fazoolTokens
        }
    }
`);

const ADD_FAZOOL_TOKENS = graphql(`
    mutation AddFazoolTokens($targetAccountID: Int!, $numberOfFazoolTokens: Int!) {
        addFazoolTokens(targetAccountID: $targetAccountID, numberOfFazoolTokens: $numberOfFazoolTokens) {
           fazoolTokens
        }
    }
`);

interface FazoolTokenOptionProps {
    accountID: number,
    numberOfFazoolTokens: number,
    costInDollars: string,
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}
function FazoolTokenOption({ accountID, numberOfFazoolTokens, costInDollars, variant}: FazoolTokenOptionProps) {
    const [addFazoolTokensMutation, { error: addFazoolTokensMutationError }] = useMutation(ADD_FAZOOL_TOKENS, {
        refetchQueries: [
            {query: GET_ACCOUNT },
        ]
    });

    if (addFazoolTokensMutationError) console.log(`Error adding fazool tokens: ${addFazoolTokensMutationError}`)

    const addFazoolTokens = () => {
        addFazoolTokensMutation({ variables: {targetAccountID: accountID, numberOfFazoolTokens: numberOfFazoolTokens}})
    }
    return (
        <>
            <Separator/>
            <div className='flex justify-between items-center w-full'>
                <div className='flex'>
                    <p>{numberOfFazoolTokens}</p>
                    <Coins className='ml-2'/>
                </div>
                <div className='flex items-center gap-2'>
                    <p>${costInDollars}</p>
                    <Button onClick={addFazoolTokens} variant={variant}>Buy</Button>
                </div>
            </div>
        </>
    )
}

export default FazoolTokenOption