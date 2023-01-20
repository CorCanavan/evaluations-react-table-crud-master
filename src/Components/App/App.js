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
    if (data) {
      const formattedData = data.allUsers.map(user => {
        const splitRole = user.role.split("_")
        const formattedRole = splitRole.reduce((acc, role) => {
          const lowercase = role.substring(1).toLowerCase();
          const newFormat = role[0] + lowercase;
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
    <main>
      <section className="content-container">
        <Header />
        <Container allUsersData={allUsersData} />
      </section>
    </main>
  )
}

export default App;