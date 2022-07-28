import React from 'react'
import Song from '../shared-components/Song'
import './QueueItem.css'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

function QueueItem () {
  return (
    <div className="queue-item">
        <Song></Song>
        <div className='vote'> 15 </div>
        <div className="voter">
          <Button variant="light" className="up-vote"><FontAwesomeIcon icon={faAngleUp} /></Button>
          <Button variant="light" className="up-vote"><FontAwesomeIcon icon={faAngleDown} /></Button>
        </div>
    </div>
  );
}

export default QueueItem;