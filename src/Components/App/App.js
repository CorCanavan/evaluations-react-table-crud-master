import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';

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
  const [allUsersData, setAllUsersData] = useState([])

  useEffect(() => {
    console.log("data before if", data)
    if (data) {
      console.log("data after if", data)
      setAllUsersData(data.allUsers)
    }
  }, [data])

    if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  // return (
  //   <pre>
  //     <code>
  //       {JSON.stringify(allUsersData, null, 2)}
  //     </code>
  //   </pre>
  // )
  return (
    <div>
      <Header />
    </div>
  )
}

export default App;