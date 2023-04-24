import { SimpleSong } from '../../gql/graphql'
import './Song.css'

interface SongProps {
    song: SimpleSong
}
function Song({ song }: SongProps) {
  return (
    <div className='cp-song'>Song</div>
  )
}

export default Song