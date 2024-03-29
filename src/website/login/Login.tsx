import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { graphql } from '../../gql';
import { AccountLogin } from '../../gql/graphql';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Eye } from 'lucide-react';


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
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect")
    const navigate = useNavigate();
    const [passwordInputType, setPasswordInputType] = useState<'text' | 'password'>('password')


    const [loginMutation, { error: loginMutationError }] = useMutation(LOGIN, {
        onCompleted(data) {
            localStorage.setItem("fazool-account-token", data.login)
            fetch(`${import.meta.env.VITE_BACKEND_API_HTTP_ADDRESS}/refresh-token`, {
                credentials: 'include',
                method: 'GET',
                headers: {
                    AccountAuthentication: `Bearer ${data.login}`
                },
            })
            if (redirect){
                navigate(redirect);
            } else {
                navigate("/home");
            }
        }
    });

    const togglePasswordInputType = () => {
        if(passwordInputType == 'text') {
            setPasswordInputType('password')
        } else {
            setPasswordInputType('text')
        }
    }

    const logoOnClick = () => {
        navigate('/');
    }

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

    if (loginMutationError) console.log(`Error! ${loginMutationError.message}`)

    return (
        <div className='flex flex-col justify-center items-center h-5/6'>
            <LogoIcon onClick={logoOnClick} className='md:h-24 h-16 m-4'/>
            <Card className='md:w-1/4 w-3/4 p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-4'>
                        <h1 className='text-3xl font-semibold tracking-tight' >Login</h1>
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
                                    <div className='flex'>
                                        <FormControl>
                                            <Input placeholder='Password' type={passwordInputType} {...field}/>
                                        </FormControl>
                                        <Button onClick={togglePasswordInputType} variant={'ghost'} size={'icon'}><Eye/></Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className='text-xs text-muted-foreground cursor-pointer mt-2' onClick={() => navigate('/create-password-change-request')}>Forgot password?</p>
                        {loginMutationError && <p className='text-destructive mt-2'>Invalid login credentials!</p>}
                        <Button type='submit' className='mt-1'>Login</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Login