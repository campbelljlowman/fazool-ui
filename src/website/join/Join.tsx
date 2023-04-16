import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useLazyQuery, gql } from '@apollo/client';

const GET_VOTER_TOKEN = gql`
    query getVoterToken {
        voterToken
    }
`

function Join() {
    const navigate = useNavigate();
    const [sessionID, setSessionID] = useState("");
    const [joinVotersQuery, { error: joinVotersMutationError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.voterToken);
            navigate(`/session/${sessionID}`);
        },
    });

    const handleChange = (e) => {
        setSessionID(e.target.value);
    }

    const joinSession = (e) => {
        e.preventDefault();
        joinVotersQuery();
        
    }

    if (joinVotersMutationError) return `Error joining voters: ${joinVotersMutationError.message}`;

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