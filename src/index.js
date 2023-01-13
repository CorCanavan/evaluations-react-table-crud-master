import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import App from './Components/App/App';

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  }
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));