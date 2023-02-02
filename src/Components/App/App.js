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

const ROLES_QUERY = gql`
  query {
    __type(name: "Role") {
      name
      enumValues {
        name
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email,
        newAttributes: $newAttributes
    ) {
      name,
      role
    }
  }
`;

const App = () => {
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(ALL_USERS_QUERY);
  const { loading: rolesLoading, error: rolesError, data: rolesData } = useQuery(ROLES_QUERY);
  const [allUsersData, setAllUsersData] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState({});
  const [deleteUsers] = useMutation(DELETE_USERS);
  const [resetUsers] = useMutation(RESET_USERS);
  const [updateUser] = useMutation(UPDATE_USER)
  const history = useHistory();

  const formatRole = (enumRole) => {
    const revisedRole = enumRole.split("_")
    return revisedRole.map(role => {
      return role[0] + role.substring(1).toLowerCase();
    }).join(" ")
  }
  
  useEffect(() => {
    resetUsers(true)
    console.log('meow')
    if (usersData && rolesData) {
      const formattedData = usersData.allUsers.map((user, index) => {
        return {
          id: index + 1,
          email: user.email,
          name: user.name,
          role: formatRole(user.role),
          enumRole: user.role,
          typename: user.__typename,
          isChecked: false
        }
      })
      setAllUsersData(formattedData)
      setAllRoles(rolesData.__type.enumValues)
    }
  }, [usersData])

    if (usersLoading || rolesLoading) {
    return <p>Loading...</p>;
  }

  if (usersError) {
    return <p>Error: {JSON.stringify(usersError)}</p>;
  }

  if (rolesError) {
    return <p>Error: {JSON.stringify(rolesError)}</p>;
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
    const filteredUsers = allUsersData.filter(user => !user.isChecked)
    deleteUsers({ variables : { emails }})
    setAllUsersData(filteredUsers)
    setSelectedUsers([])
  }

  const handleEditUser = (name) => {
    const findUserByName = allUsersData.find(user => user.name === name)
    findUserByName.role = findUserByName.enumRole
    console.log("findUserByName", findUserByName)
    setUserToEdit(findUserByName)
    history.push(`user/${findUserByName.email}`);
  }

  const clearUserToEdit = () => {
    setUserToEdit({})
  }

  const handleUpdatedUser = () => {
    const userAttrInput = {
      name: userToEdit.name,
      role: userToEdit.role
    }
    // updateUser({ variables: { email: userToEdit.email, newAttributes: userAttrInput }, refetchQueries: [{query: ALL_USERS_QUERY}] })

    updateUser({ variables: { email: userToEdit.email, newAttributes: userAttrInput } })

    console.log("allUsers1", allUsersData)
    const updatedAllUsers = allUsersData.map(user => {
      if (user.email === userToEdit.email) {
        return {
          ...user,
          name: userToEdit.name,
          role: formatRole(userToEdit.role),
          // isChecked: userToEdit.isChecked
        }
      } else {
        return user;
      }
    })
    setAllUsersData(updatedAllUsers)
    clearUserToEdit();
    console.log("allUsers2", allUsersData)
  }

  return (
    <main>
      <Route
        exact path="/"
        render={() => {
          return <section className="content-container">
            <Header 
              selectedUsers={selectedUsers} 
              handleDelete={handleDelete} 
            />
            <Container 
              allUsersData={allUsersData} 
              handleCheck={handleCheck} 
              handleEditUser={handleEditUser} 
            />
          </section>
        }}
      />
      <Route
        exact path="/user/:email"
        render={() => {
          return <section className="content-container">
            <Header 
              userToEdit={userToEdit} 
              handleUpdatedUser={handleUpdatedUser}
            />
            <Details
              setUserToEdit={setUserToEdit} 
              userToEdit={userToEdit} 
              allRoles={allRoles} 
              formatRole={formatRole} 
            />
          </section>
        }}
      />
    </main>
  )
}

export default App;