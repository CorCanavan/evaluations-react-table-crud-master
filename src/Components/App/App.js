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
  const [selectedUser, setSelectedUser] = useState([])

  useEffect(() => {
    if (data) {
      const formattedData = data.allUsers.map((user, index) => {
        const splitRole = user.role.split("_")
        const formattedRole = splitRole.reduce((acc, role) => {
          const lowercase = role.substring(1).toLowerCase();
          const newFormat = role[0] + lowercase;
          acc.push(newFormat)
          return acc;
        }, []).join(" ")
        return {
          id: index + 1,
          email: user.email,
          name: user.name,
          role: formattedRole,
          typename: user.__typename,
          isChecked: false
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


  const handleCheck = (id) => {
    console.log("checked!")
    console.log("id", id)
    // console.log("isChecked", isChecked)
    const revisedUsers = allUsersData.map (user => {
      if (user.id === id) {
        const updatedUser = {
          ...user,
          isChecked : !user.isChecked
        }
        const toggleSelectedUser = updatedUser.isChecked ? updatedUser : []
        setSelectedUser(toggleSelectedUser)
        return updatedUser;
      } else {
        return user;
      }
    })
    console.log('revisedUsers', revisedUsers)
    setAllUsersData(revisedUsers)
    console.log("hi")
    // handleSelectedUser();
  }

  // const handleSelectedUser = () => {
  //   const filteredByChecked = allUsersData.filter(user => user.isChecked === true)
  //   console.log("filtered", allUsersData, filteredByChecked)
  //   setSelectedUser(filteredByChecked)
  // }

  return (
    <main>
      <section className="content-container">
        <Header />
        <Container allUsersData={allUsersData} handleCheck={handleCheck} />
      </section>
    </main>
  )
}

export default App;