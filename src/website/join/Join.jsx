import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';

const JOIN_VOTERS = gql`
  mutation joinVoters {
    joinVoters
  }
`

function Join() {
    const navigate = useNavigate();
    const [sessionID, setSessionID] = useState("");
    const [joinVotersMutation, { error: joinVotersMutationError }] = useMutation(JOIN_VOTERS, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.joinVoters);
            navigate(`/session/${sessionID}`);
        },
    });

    const handleChange = (e) => {
        setSessionID(e.target.value);
    }

    const joinSession = (e) => {
        e.preventDefault();
        joinVotersMutation();
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