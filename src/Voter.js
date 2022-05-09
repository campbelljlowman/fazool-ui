import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './Voter.css'

export default class Voter extends PureComponent {
  render() {
    return (
      <div class="voter">
            <Button variant="light" className="up-vote"><FontAwesomeIcon icon={faAngleUp} /></Button>
            <Button variant="light" className="up-vote"><FontAwesomeIcon icon={faAngleDown} /></Button>
      </div>
    )
  }
}
