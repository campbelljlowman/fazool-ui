import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: `http://${import.meta.env.VITE_BACKEND_SERVER}/query`,
});

const wsLink = new GraphQLWsLink(createClient({
    url: `ws://${import.meta.env.VITE_BACKEND_SERVER}/query`,
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
    // get the authentication token from local storage if it exists
    const account_token = sessionStorage.getItem('account-token');
    const voter_token = sessionStorage.getItem('voter-token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            AccountAuthentication: account_token ? `Bearer ${account_token}` : "",
            VoterAuthentication: voter_token ? `Bearer ${voter_token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);