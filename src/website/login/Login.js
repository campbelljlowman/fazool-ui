import React, {useState }  from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const login = (e) => {
    e.preventDefault();
    console.log("Login!");
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