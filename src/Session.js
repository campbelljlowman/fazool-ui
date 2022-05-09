import React from 'react'
import MusicPlayer from './MusicPlayer'
import Queue from './Queue'
import Ad from './Ad'
import JoinLink from './JoinLink'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Session() {
  return (
    <>
    <Container>
      <Row>
        <Col xs={3}>
         <JoinLink />
        </Col>
        <Col xs={6}>
          <MusicPlayer />
          <Queue />
        </Col>
        <Col xs={3}>
          <Ad />
        </Col>
      </Row>
    </Container>
    </>
  )
}
