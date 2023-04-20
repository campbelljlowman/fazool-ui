import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws'
import { Client, Provider, fetchExchange, subscriptionExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';


const wsClient = createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_SERVER,
    connectionParams: {
        SubscriptionAuthentication: "Subscription-Allowed",
    },
});

const urqlClient = new Client({
    url: import.meta.env.VITE_GRAPHQL_HTTP_SERVER,
    exchanges: [
        cacheExchange({
            updates: {
                Mutation: {
                    updateQueue(_result, args, cache, _info) {
                        cache.invalidate({ 
                            __typename: 'Voter'
                        });
                    }
                }
            }
        }), 
        fetchExchange,
        subscriptionExchange({
            forwardSubscription(request) {
              const input = { ...request, query: request.query || '' }
              return {
                subscribe(sink) {
                  const unsubscribe = wsClient.subscribe(input, sink)
                  return { unsubscribe };
                },
              };
            },
          }),
        ],
        fetchOptions: () => {
        const accountToken = sessionStorage.getItem('account-token');
        const voterToken = sessionStorage.getItem('voter-token');
        return {
            headers: {  
                AccountAuthentication: accountToken ? `Bearer ${accountToken}` : '' ,
                VoterAuthentication: voterToken ? `Bearer ${voterToken}` : ''
            },
        };
      },
});


const httpLink = new HttpLink({
    uri: `http://${import.meta.env.VITE_BACKEND_SERVER}/query`,
});

// TODO: Pass voter token on this dynamically
const wsLink = new GraphQLWsLink(createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_SERVER,
    connectionParams: {
        SubscriptionAuthentication: "Subscription-Allowed",
    },
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const authLink = setContext((_, { headers }) => {
    const accountToken = sessionStorage.getItem('account-token');
    const voterToken = sessionStorage.getItem('voter-token');
    return {
        headers: {
            ...headers,
            AccountAuthentication: accountToken ? `Bearer ${accountToken}` : "",
            VoterAuthentication: voterToken ? `Bearer ${voterToken}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider value={urqlClient}>
                <App />
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);
