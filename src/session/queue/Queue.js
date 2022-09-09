import QueueItem from './QueueItem'
import './Queue.css'
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

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

const SUBSCRIBE_SESSION = gql`
  subscription sessionSubscription($sessionID: Int!) {
    sessionUpdated(sessionID: $sessionID){
      id
      queue{
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
  const params = useParams();
  const sessionID = params.sessionID;

  const { subscribeToMore, loading, error, data } = useQuery(GET_SESSION, { 
    variables: {sessionID: sessionID}
  });

  useEffect (() => {
    const subscribeToSession = () => {
      subscribeToMore({
        document: SUBSCRIBE_SESSION,
        variables: {sessionID: sessionID},
        updateQuery: (prev, {subscriptionData}) => {
          if(!subscriptionData.data) return prev;
          // TODO: There's probably a better way to merge these resulst
          const returnSession = structuredClone(prev);
          returnSession.session[0].queue = subscriptionData.data.sessionUpdated.queue;
          return returnSession;
        }
      });
    }
    subscribeToSession();
  }, [subscribeToMore, sessionID]);

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
