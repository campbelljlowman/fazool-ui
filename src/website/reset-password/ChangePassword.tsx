import { useSearchParams } from "react-router-dom";
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { graphql } from '../../gql';
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



const CHANGE_PASSWORD = graphql(`
    mutation changePassword ($passwordChangeRequestID: String!, $newPassword: String!) {
        changePassword(passwordChangeRequestID: $passwordChangeRequestID, newPassword: $newPassword) {
            id
        }
    }
`);

const formSchema = z.object({
    password: z.string().min(1, { message: "Password is required" })
})

function ChangePassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const passwordChangeRequestID = searchParams.get("passwordChangeRequestID")

    const [changePasswordMutation, { error: changePasswordMutationError }] = useMutation(CHANGE_PASSWORD, {
        onCompleted(voterTokenData) {
            navigate('/home');
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: ''
        },
    })


    const logoOnClick = () => {
        navigate('/');
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (passwordChangeRequestID == null) {
            console.log("password change requested but password request change ID is null");
            return;
        }
        changePasswordMutation({ variables: { passwordChangeRequestID: passwordChangeRequestID, newPassword: values.password } });
    }

    if (changePasswordMutationError) console.log(changePasswordMutationError);
    if (passwordChangeRequestID == null) return <div>No password change request ID provided</div>

    return (
<div className='flex flex-col justify-center items-center h-5/6'>
            <LogoIcon onClick={logoOnClick} className='md:h-24 h-16 m-4'/>
            <Card className='md:w-1/4 w-3/4 p-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center gap-4'>
                        <h1 className='text-3xl font-semibold tracking-tight' >Reset Password</h1>
                        <p className='text-muted-foreground text-center'>Enter your new password</p>
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
                        {changePasswordMutationError && <p className='text-destructive mt-2'>Password reset failed</p>}
                        <Button type='submit' className='mt-1 w-1/3'>Change Password</Button>
                        {/* <Button className='w-1/3' variant={'secondary'} onClick={() => navigate('/login')}>Back to login</Button> */}
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default ChangePassword