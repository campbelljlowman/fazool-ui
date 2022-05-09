import React, { PureComponent } from 'react'
import Header from './Header'
import QueueItem from './QueueItem'

export default class Queue extends PureComponent {
  render() {
    return (
      <div > 
          <Header></Header>
          <div>
              <QueueItem></QueueItem>
              <QueueItem></QueueItem>
              <QueueItem></QueueItem>
              <QueueItem></QueueItem>
          </div>
      </div>
    )
  }
}
