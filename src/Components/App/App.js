import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import './App.css';

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <pre>
      <code>
        {JSON.stringify(data, null, 2)}
      </code>
    </pre>
  )
}

export default App;