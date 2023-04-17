import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { graphql } from '../../gql';
import { useMutation } from 'urql';
import { AccountLogin } from '../../gql/graphql';


const LOGIN = graphql(`
    mutation login ($accountLogin: AccountLogin!) {
        login(accountLogin:$accountLogin)
    }
`);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loginResult, loginMutation] = useMutation(LOGIN);

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const login = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const accountLogin: AccountLogin = {
            "email": email,
            "password": password
        };

        loginMutation({accountLogin: accountLogin}).then(result => {
            if(result.error){
                console.log(`Error logging in!: ${result.error}`);
            }
            sessionStorage.setItem("account-token", result.data!.login);
            navigate("/home");
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={8}>
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
                </Col>
            </Row>
        </Container>
    )
}

export default Login