import QueueItem from './QueueItem'
import './Queue.css'
import { useQuery, gql } from '@apollo/client';

const GET_SESSION = gql`
  query getSession($sessionID: Int!){
    session(sessionID: $sessionID){
      queue {
        id
        title
        artist
        image
        votes
      }
    }
  }
`;

function Queue () {
  const { loading, error, data } = useQuery(GET_SESSION, { 
    variables: {sessionID: 81}
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if(!data.session[0].queue){
    return null;
  }

  return (
      <div className='queue'>
          {data.session[0].queue.map(song => (
            <QueueItem key={song.id} song={song} />
          ))}
      </div>
  );
}

export default Queue;
