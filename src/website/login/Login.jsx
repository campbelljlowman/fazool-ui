import React, { useState } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const LOGIN = gql`
  mutation login ($accountLogin: AccountLogin!) {
    login(accountLogin:$accountLogin)
  }
`;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loginMutation, { error }] = useMutation(LOGIN, {
        onCompleted(data) {
            sessionStorage.setItem("account-token", data.login)

            navigate("/home");
        }
    });

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const login = (e) => {
        e.preventDefault();
        const accountLogin = {
            "email": email,
            "password": password
        };

        loginMutation({ variables: { accountLogin: accountLogin } });
    }

    // TODO: parse error message and don't replace form
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <div className="justify-content-md-center">
                <div xs={8}>
                    <div>Login</div>
                    <form>
                        <label>Email:<br />
                            <input type="text" placeholder="Email" value={email} onChange={handleEmail} />
                        </label><br />

                        <label >Password:<br />
                            <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </label><br />
                        <button className="transparent-button" onClick={login}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login