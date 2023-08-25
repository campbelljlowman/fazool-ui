import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws'
import './index.css'

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_API_HTTP_ADDRESS,
});

// TODO: Pass voter token on this dynamically?
const wsLink = new GraphQLWsLink(createClient({
    url: import.meta.env.VITE_GRAPHQL_API_WS_ADDRESS,
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


const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) => {
            if (message == "account token is expired") {
                fetch(`${import.meta.env.VITE_BACKEND_API_HTTP_ADDRESS}/refresh-token`, {
								credentials: 'include',
                method: 'POST',
                }).then(response => response.text()
                ).then(responseText => {
                    localStorage.setItem("fazool-account-token", responseText)
                    location.reload()
                }).catch(() => {
                    window.location.href = `${import.meta.env.VITE_BACKEND_API_HTTP_ADDRESS}/login`
                })
            }
        }
      );
});

const client = new ApolloClient({
    link: from([authLink, errorLink, splitLink]),
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
