import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useMutation } from 'urql';
import { graphql } from '../../gql'

const GET_VOTER_TOKEN = graphql(`
    mutation getVoterToken {
        voterToken
    }
`);

function Join() {
    const navigate = useNavigate();
    const [sessionID, setSessionID] = useState("");
    const [getVoterTokenResult, getVoterTokenMutation] = useMutation(GET_VOTER_TOKEN);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSessionID(e.target.value);
    }

    const joinSession = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        getVoterTokenMutation({}).then(result => {
            if(result.error){
                console.log(`Error getting voter token: ${result.error.message}`);
            }
            sessionStorage.setItem('voter-token', result.data!.voterToken);
            navigate(`/session/${sessionID}`);  
        });
        
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