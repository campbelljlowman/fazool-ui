import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useMutation } from 'urql';
import { useNavigate } from 'react-router-dom';
import { graphql } from '../../gql'


const CREATE_ACCOUNT = graphql(`
    mutation createAccount ($newAccount: NewAccount!) {
        createAccount(newAccount: $newAccount)
    }
`)

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // TODO: Get errors variable here and check 
    const [createAccountResult, createAccountMutation] = useMutation(CREATE_ACCOUNT)

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

    const submitRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newAccount = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        };

        createAccountMutation({ newAccount: newAccount }).then(result => {
            if(result.error){
                console.log(`Error creating account: ${result.error.message}`);
            }
            sessionStorage.setItem("account-token", result.data!.createAccount)
            navigate("/home");
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={8}>
                    <div>Sign Up!</div>
                    <form>
                        <label>First name:<br />
                            <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstName} />
                        </label><br />

                        <label>Last name:<br />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastName} />
                        </label><br />

                        <label>Email:<br />
                            <input type="text" placeholder="Email" value={email} onChange={handleEmail} />
                        </label><br />

                        <label >Password:<br />
                            <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </label><br />

                        <button className="transparent-button" onClick={submitRegistration}>Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register