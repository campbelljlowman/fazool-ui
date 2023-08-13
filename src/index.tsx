import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws'
import './index.css'

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_HTTP_SERVER,
});

// TODO: Pass voter token on this dynamically?
const wsLink = new GraphQLWsLink(createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_SERVER,
    connectionParams: {
        SubscriptionAuthentication: "Subscription-Allowed",
    }
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
    const accountToken = localStorage.getItem('fazool-account-token');
    const voterToken = localStorage.getItem('fazool-voter-token');
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
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);
