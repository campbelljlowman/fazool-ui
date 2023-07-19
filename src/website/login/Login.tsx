import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { graphql } from '../../gql';
import { AccountLogin } from '../../gql/graphql';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import './Login.css'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';


const LOGIN = graphql(`
    mutation login ($accountLogin: AccountLogin!) {
        login(accountLogin:$accountLogin)
    }
`);

const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

function Login() {
    const navigate = useNavigate();

    const [loginMutation, { error: loginMutationError }] = useMutation(LOGIN, {
        onCompleted(data) {
            sessionStorage.setItem("account-token", data.login)
            navigate("/home");
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const accountLogin: AccountLogin = {
            "email": values.email,
            "password": values.password
        };

        loginMutation({ variables: { accountLogin: accountLogin } });
    }

    // TODO: parse error message and don't replace form
    if (loginMutationError) console.log(`Error! ${loginMutationError.message}`)

    return (
        <div className='flex flex-col justify-center items-center h-5/6'>
            <LogoIcon className='h-24 m-4'/>
            <Card className='w-1/4 p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-2'>
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
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Password' type='password' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mt-3'>Login</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Login