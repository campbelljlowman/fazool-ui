import React, {useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation createUser ($newUser: NewUser!) {
    createUser(newUser: $newUser){
      firstName
      id
    }
  }
`;

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser] = useMutation(CREATE_USER);


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

    const newUser = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
    };

    createUser({ variables: {newUser: newUser}});

    console.log("Submit registration");
    console.log(password);
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