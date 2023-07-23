import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../../gql'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const GET_VOTER_TOKEN = graphql(`
    query getVoterToken {
        voterToken
    }
`);

const formSchema = z.object({
    sessionID: z.string().length(6, {
        message: "Session ID must be 6 numbers"
    }),
})

function Join() {
    const navigate = useNavigate();
    const [sessionID, setSessionID] = useState("");

    const [getVoterTokenQuery, { error: getVoterTokenQueryError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.voterToken);
            navigate(`/session/${sessionID}`);
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sessionID: '',
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setSessionID(values.sessionID);
        getVoterTokenQuery();
    }

    if (getVoterTokenQueryError) console.log(`Error joining voters: ${getVoterTokenQueryError.message}`)

    return (
        <div className='flex flex-col justify-center items-center h-5/6'>
            <LogoIcon className='md:h-24 h-16 m-4'/>
            <Card className='md:w-1/4 p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center'>
                        <h1 className='text-3xl font-semibold tracking-tight' >Join Session</h1>
                        <FormField
                            control={form.control}
                            name='sessionID'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Session ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Session ID' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mt-3'>Join</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Join