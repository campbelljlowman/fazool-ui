import { useMutation } from '@apollo/client';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { useNavigate } from "react-router-dom";
import { graphql } from '../../gql';


const CREATE_PASSWORD_CHANGE_REQUEST = graphql(`
    mutation createPasswordChangeRequest ($email: String!) {
        createPasswordChangeRequest(email:$email)
    }
`);

const formSchema = z.object({
    email: z.string().email(),
})

function CreatePasswordChangeRequest() {
    const navigate = useNavigate();

    const [createPasswordChangeRequestMutation, { error: createPasswordChangeRequestMutationError }] = useMutation(CREATE_PASSWORD_CHANGE_REQUEST)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    const logoOnClick = () => {
        navigate('/');
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createPasswordChangeRequestMutation({ variables: { email: values.email } });
    }

    if (createPasswordChangeRequestMutationError) console.log(`Error! ${createPasswordChangeRequestMutationError.message}`)

    return (
        <div className='flex flex-col justify-center items-center h-5/6'>
            <LogoIcon onClick={logoOnClick} className='md:h-24 h-16 m-4'/>
            <Card className='md:w-1/4 w-3/4 p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-4'>
                        <h1 className='text-3xl font-semibold tracking-tight' >Reset Password</h1>
                        <p className='text-muted-foreground text-center'>Tell us the email address assocuated with your Fazool account and we'll email you a link to reset your password</p>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Email' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {createPasswordChangeRequestMutationError && <p className='text-destructive mt-2'>Password reset failed</p>}
                        <Button type='submit' className='mt-1 w-1/3'>Reset</Button>
                        <Button className='w-1/3' variant={'secondary'} onClick={() => navigate('/login')}>Back to login</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default CreatePasswordChangeRequest