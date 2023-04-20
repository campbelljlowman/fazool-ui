import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';
import { graphql } from '../../gql'

const GET_VOTER_TOKEN = graphql(`
    query getVoterToken {
        voterToken
    }
`);

function Join() {
    const navigate = useNavigate();
    const [sessionID, setSessionID] = useState("");

    const [getVoterTokenQuery, { error: getVoterTokenQueryError }] = useLazyQuery(GET_VOTER_TOKEN, {
        onCompleted(voterTokenData) {
            sessionStorage.setItem('voter-token', voterTokenData.voterToken);
            navigate(`/session/${sessionID}`);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSessionID(e.target.value);
    }

    const joinSession = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        getVoterTokenQuery();
        
    }

    if (getVoterTokenQueryError) console.log(`Error joining voters: ${getVoterTokenQueryError.message}`)

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