import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import store from './store';

const httpLink = new HttpLink({
  uri: 'https://e5vosfal-graphql.herokuapp.com/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = store.state.currentUser.hasuraJwt;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'wss://e5vosfal-graphql.herokuapp.com/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: () => {
      const token = store.state.currentUser.hasuraJwt;
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  },
});

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition'
      && def.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
