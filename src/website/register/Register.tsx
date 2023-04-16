import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_ACCOUNT = gql`
  mutation createAccount ($newAccount: NewAccount!) {
    createAccount(newAccount: $newAccount)
  }
`;

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // TODO: Get errors variable here and check 
    const [createAccount, { error }] = useMutation(CREATE_ACCOUNT, {
        onCompleted(data) {
            sessionStorage.setItem("account-token", data.createAccount)

            navigate("/home");
        }
    });


    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const submitRegistration = (e) => {
        e.preventDefault();

        const newAccount = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password
        };

        createAccount({ variables: { newAccount: newAccount } });
    }

    // TODO: parse error message and don't replace form
    if (error) return `Error! ${error.message}`;


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