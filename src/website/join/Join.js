import React, {useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";


function Join() {
    const navigate = useNavigate();
    const [sessionID, setSessionID] = useState("");

    const handleChange = (e) => {
        setSessionID(e.target.value);
    }

    const joinSession = (e) => {
        e.preventDefault();
        navigate(`/session/${sessionID}`);
    }

  return (
    <Container>
    <Row className="justify-content-md-center">
      <Col xs={8}>
            <div>Join Session!</div>
            <form>
                <input type="text" placeholder="Session ID" value={sessionID} onChange={handleChange} /> 
                <button className="transparent-button" onClick={joinSession}>Join</button>
            </form>
      </Col>
    </Row>
  </Container>
  )
}

export default Join