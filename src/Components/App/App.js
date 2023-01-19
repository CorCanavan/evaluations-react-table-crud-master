import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Container from '../Container/Container';

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
      const formattedData = data.allUsers.map(user => {
        let splitRole = user.role.split("_")
        let formattedRole = splitRole.reduce((acc, role) => {
          let lowercase = role.substring(1).toLowerCase();
          let newFormat = role[0] + lowercase;
          acc.push(newFormat)
          return acc;
        }, []).join(" ")
        return {
          email: user.email,
          name: user.name,
          role: formattedRole,
          typename: user.__typename
        }
      })
      setAllUsersData(formattedData)
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
      <Container allUsersData={allUsersData} />
    </div>
  )
}

export default App;