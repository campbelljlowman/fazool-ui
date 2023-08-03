import { Account } from '@/gql/graphql'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { User2 } from 'lucide-react'

interface AccountAvaterProps {
    sessionID:  number
    account:    Account | undefined
}
function AccountAvater({sessionID, account}: AccountAvaterProps) {
    const navigate = useNavigate();

    return (
        <>
        {account ? 
            <Avatar className='mr-3'>
                <AvatarFallback>
                    {Array.from(account.firstName)[0].toUpperCase()}
                    {Array.from(account.lastName)[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
        :
            <Popover>
                <PopoverTrigger>
                    <Avatar className='mr-3'>
                        <AvatarFallback>
                            <User2 />
                        </AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col items-center justify-around w-full'>
                    <Button className='m-3' variant={'secondary'} onClick={() => {navigate(`/register?redirect=/session/${sessionID}`);}}>Sign Up</Button>
                    <Button className='m-3' variant={'secondary'} onClick={() => {navigate(`/login?redirect=/session/${sessionID}`);}}>Login</Button>
                </PopoverContent>
            </Popover>
        }
        </>
    )
}

export default AccountAvater