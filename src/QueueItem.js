import React, { PureComponent } from 'react'
import Song from './Song'
import Voter from './Voter'
import Vote from './Vote'
import './QueueItem.css'

export default class QueueItem extends PureComponent {
  render() {
    return (
      <div class="queue-item">
          <Song></Song>
          <Vote></Vote>
          <Voter></Voter>
      </div>
    )
  }
}
