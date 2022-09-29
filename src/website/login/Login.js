import React, {useState }  from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const LOGIN = gql`
  mutation login ($userLogin: UserLogin!) {
    login(userLogin:$userLogin){
      jwt
    }
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loginMutation, { error }] = useMutation(LOGIN, {
    onCompleted(data){
      sessionStorage.setItem("jwt", data.login.jwt)

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
    const userLogin = {
      "email": email,
      "password": password
    };

    loginMutation({ variables: {userLogin: userLogin}});
  }
  
  // TODO: parse error message and don't replace form
  if (error) return `Error! ${error.message}`;

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