import React from 'react'
import { Playlist } from '../../gql/graphql'

interface PlaylistItmeProps {
    image: string,
    name: string
}
function PlaylistItem({ image, name }: PlaylistItmeProps) {
  return (
    <div className='playlist-item'>
        <img src={image} alt='playlist cover' />
        <div>{name}</div>
    </div>
  )
}

export default PlaylistItem