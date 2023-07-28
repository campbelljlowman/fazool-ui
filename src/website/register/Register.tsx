import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { graphql } from '../../gql';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';


const CREATE_ACCOUNT = graphql(`
    mutation createAccount ($newAccount: NewAccount!) {
        createAccount(newAccount: $newAccount)
    }
`);

const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()
})

function Register() {
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect")
    const navigate = useNavigate();

    // TODO: Get errors variable here and check 
    const [createAccountMutation, { error: createAccountMutationError }] = useMutation(CREATE_ACCOUNT, {
        onCompleted(data) {
            sessionStorage.setItem("account-token", data.createAccount)
            if (redirect){
                navigate(redirect);
            } else {
                navigate("/home");
            }      
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const newAccount = {
            "firstName": values.firstName,
            "lastName": values.lastName,
            "email": values.email,
            "password": values.password
        };

        createAccountMutation({ variables: { newAccount: newAccount } });
    }

    // TODO: parse error message and don't replace form
    if (createAccountMutationError) console.log(`Error! ${createAccountMutationError.message}`)


    return (
        <div className='flex flex-col justify-center items-center md:h-5/6'>
            <LogoIcon className='md:h-24 h-16 m-4'/>
            <Card className='md:w-1/4 p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-4'>
                        <h1 className='text-3xl font-semibold tracking-tight' >Register</h1>
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='First Name' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='lastName'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Last Name' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                        <Input placeholder='Password' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {createAccountMutationError && <p className='text-destructive mt-2'>Error creating account!</p>}
                        <Button type='submit' className='mt-3'>Register</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Register