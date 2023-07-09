import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { graphql } from '../../gql';
import { AccountLogin } from '../../gql/graphql';
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import './Login.css'
import React from 'react';
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';

const MdFilledButtonComponent = createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButton,
    react: React,
});

const LOGIN = graphql(`
    mutation login ($accountLogin: AccountLogin!) {
        login(accountLogin:$accountLogin)
    }
`);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loginMutation, { error: loginMutationError }] = useMutation(LOGIN, {
        onCompleted(data) {
            sessionStorage.setItem("account-token", data.login)
            navigate("/home");
        }
    });

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const login = (event: React.MouseEvent<MdFilledButton>) => {
        event.preventDefault();
        const accountLogin: AccountLogin = {
            "email": email,
            "password": password
        };

        loginMutation({ variables: { accountLogin: accountLogin } });
    }

    // TODO: parse error message and don't replace form
    if (loginMutationError) console.log(`Error! ${loginMutationError.message}`)

    return (
        <div className='login-page'>
                <LogoIcon className='logo-wrapper-main'/>
                <div className='login-forms-card'> 
                    <h1 className='display-small'>Log In</h1>

                    <input className='input-field' type="text" placeholder="Email" value={email} onChange={handleEmail} />
                    <input className='input-field' type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    <MdFilledButtonComponent className='navigation-button' onClick={login}>Log In</MdFilledButtonComponent>   
                </div>
        </div>
    )
}

export default Login