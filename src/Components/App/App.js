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

const App = () => {
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(ALL_USERS_QUERY);
  const [allUsersData, setAllUsersData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState({})
  const [deleteUsers] = useMutation(DELETE_USERS)
  const [resetUsers] = useMutation(RESET_USERS)
  const {loading: rolesLoading, error: rolesError, data: rolesData} = useQuery(ROLES_QUERY);
  const [allRoles, setAllRoles] = useState([])

  const history = useHistory();

  const formatRole = (enumRole) => {
    const revisedRole = enumRole.split("_")
    return revisedRole.map(role => {
      return role[0] + role.substring(1).toLowerCase();
    }).join(" ")
  }
  
  useEffect(() => {
    resetUsers(true)
    if (usersData && rolesData) {
      const formattedData = usersData.allUsers.map((user, index) => {
        return {
          id: index + 1,
          email: user.email,
          name: user.name,
          role: formatRole(user.role),
          typename: user.__typename,
          isChecked: false
        }
      })
      // console.log("formattedRole", formattedRole)
      console.log('usersData', usersData)
      console.log('rolesData', rolesData)
      console.log('rolesDatalong', rolesData.__type.enumValues)
      setAllUsersData(formattedData)
      setAllRoles(rolesData.__type.enumValues)
      // setAllRoles(rolesData)
      // setUserToEdit({})
    }
  }, [usersData])

    if (usersLoading) {
    return <p>Loading...</p>;
  }

  if (usersError) {
    return <p>Error: {JSON.stringify(usersError)}</p>;
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
    setUserToEdit(findUserByName)
    history.push(`user/${findUserByName.email}`);
  }
  // does email need to be passed down from on Click instead of name?

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
      <Route
        exact path="/user/:email"
        render={() => {
          return <section className="content-container">
            <Header userToEdit={userToEdit} />
            <Details userToEdit={userToEdit} allRoles={allRoles} formatRole={formatRole} />
          </section>
        }}
      />
    </main>
  )
}

export default App;