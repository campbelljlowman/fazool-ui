import React, { PureComponent } from 'react'
import Song from './Song'
import Voter from './Voter'
import './QueueItem.css'

export default class QueueItem extends PureComponent {
  render() {
    return (
      <div class="queue-item">
          <Song></Song>
          <div> 12 </div>
          <Voter></Voter>
      </div>
    )
  }
}
