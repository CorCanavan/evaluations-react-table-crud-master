import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Container from '../Container/Container';
import Details from '../Details/Details';
import { Route, useHistory } from 'react-router-dom';


const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const DELETE_USERS = gql`
  mutation DeleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

const RESET_USERS = gql`
  mutation ResetUsers {
    resetUsers
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  const [allUsersData, setAllUsersData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState({})
  const [deleteUsers] = useMutation(DELETE_USERS)
  const [resetUsers] = useMutation(RESET_USERS)

  const history = useHistory();

  useEffect(() => {
    resetUsers(true)
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

  const handleSelectedUsers = (revisedUsers) => {
    const filterByChecked = revisedUsers.filter(user => user.isChecked)
    setSelectedUsers(filterByChecked)
  }

  const handleCheck = (id) => {
    const revisedUsers = allUsersData.map(user => {
      if (user.id === id) {
        const updatedUser = {
          ...user,
          isChecked : !user.isChecked
        }
        return updatedUser;
      } else {
        return user;
      }
    })
    setAllUsersData(revisedUsers);
    handleSelectedUsers(revisedUsers);
  }

  const handleDelete = () => {
    const emails = selectedUsers.map(selectedUser => {
      return selectedUser.email;
    })
    deleteUsers({ variables : { emails }})
    const filteredUsers = allUsersData.filter(user => !user.isChecked)
    setAllUsersData(filteredUsers)
    setSelectedUsers([])
  }

  // const history = useHistory();

  const handleEditUser = (name) => {
    const findUserByName = allUsersData.find(user => user.name === name)
    setUserToEdit(findUserByName)
    let email = findUserByName.email
    history.push(`user/${email}`);
  }
  // does email need to be passed down from on Click instead of name?

  // can you use history object inside React Router render?

  return (
    <main>
      <Route
        exact path="/"
        render={()=> {
          return <section className="content-container">
            <Header selectedUsers={selectedUsers} handleDelete={handleDelete} />
            <Container allUsersData={allUsersData} handleCheck={handleCheck} handleEditUser={handleEditUser} />
        </section>
        }}
      />
      {/* <section className="content-container">
        <Header selectedUsers={selectedUsers} handleDelete={handleDelete} />
        <Container allUsersData={allUsersData} handleCheck={handleCheck} />
      </section> */}
      <Route
        exact path="/user/:id"
        render={({match}) => {
          // remove match
          console.log("match", match, match.params)
          const userToRender = allUsersData.find(user => user.email === match.params.id)
          console.log("userToRender", userToRender)
          return <Details {...userToRender} />
        }}
      />
    </main>
  )
}

export default App;