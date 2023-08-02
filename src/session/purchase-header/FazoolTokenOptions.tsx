import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'
import { graphql } from '../../gql';
import { useMutation } from '@apollo/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Account } from '@/gql/graphql';


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
            'getAccount',
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

interface FazoolTokenOptionsProps {
    account: Account | undefined
}
function FazoolTokenOptions({account}: FazoolTokenOptionsProps) {
    return (
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
                <p className='font-semibold text-center'>Sign up or Login to purchase Fazool tokens</p>
            }
        </PopoverContent>
    </Popover>
    )
}


export default FazoolTokenOptions