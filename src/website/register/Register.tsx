import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { graphql } from '../../gql';
import './Register.css'
import { ReactComponent as LogoIcon }  from '../../assets/vectors/logo-icon.svg'
import React from 'react';
import {createComponent} from '@lit-labs/react';
import { MdFilledButton } from '@material/web/button/filled-button.js';

const MdFilledButtonComponent = createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButton,
    react: React,
});

const CREATE_ACCOUNT = graphql(`
    mutation createAccount ($newAccount: NewAccount!) {
        createAccount(newAccount: $newAccount)
    }
`);

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // TODO: Get errors variable here and check 
    const [createAccountMutation, { error: createAccountMutationError }] = useMutation(CREATE_ACCOUNT, {
        onCompleted(data) {
            sessionStorage.setItem("account-token", data.createAccount)
            navigate("/home");
        }
    });


    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const submitRegistration = (e: React.MouseEvent<MdFilledButton>) => {
        e.preventDefault();

        const newAccount = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        };

        createAccountMutation({ variables: { newAccount: newAccount } });
    }

    // TODO: parse error message and don't replace form
    if (createAccountMutationError) console.log(`Error! ${createAccountMutationError.message}`)


    return (
        <div className='register-page'>
                <LogoIcon className='logo-wrapper-main'/>
                <div className='register-forms-card'> 
                    <h1 className='display-small'>Sign Up</h1>

                    <input className='input-field' type="text" placeholder="First Name" value={firstName} onChange={handleFirstName} />
                    <input className='input-field' type="text" placeholder="Last Name" value={lastName} onChange={handleLastName} />
                    <input className='input-field' type="text" placeholder="Email" value={email} onChange={handleEmail} />
                    <input className='input-field' type="password" placeholder="Password" value={password} onChange={handlePassword} />

                    <MdFilledButtonComponent className='navigation-button' onClick={submitRegistration}>Sign Up</MdFilledButtonComponent>   
                </div>
        </div>
        // <>
        //     <div>Sign Up!</div>
        //     <form>
        //         <label>First name:<br />
        //             <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstName} />
        //         </label><br />

        //         <label>Last name:<br />
        //             <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastName} />
        //         </label><br />

        //         <label>Email:<br />
        //             <input type="text" placeholder="Email" value={email} onChange={handleEmail} />
        //         </label><br />

        //         <label >Password:<br />
        //             <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
        //         </label><br />

        //         <button className="transparent-button" onClick={submitRegistration}>Submit</button>
        //     </form>
        // </>
    )
}

export default Register