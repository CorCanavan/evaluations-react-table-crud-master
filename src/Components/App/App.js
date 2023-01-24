import { useQuery, useMutation } from '@apollo/react-hooks';
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

// const DELETE_USERS_MUTATION = gql`
//   mutation {
//     deleteUsers {
//       email
//     }
//   }`

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

// const RESET_USERS = gql`
//   mutation ResetUsers($boolean: Boolean!) {
//     resetUsers
//   }
// `;


const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  const [allUsersData, setAllUsersData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  // const [isChecked, setIsChecked] = useState('false')
  const [deleteUsers] = useMutation(DELETE_USERS)

  // const [deleteUsers] = useMutation(DELETE_USERS, {
  //   // variables: {
  //   //   emails: emails
  //   // },
  //   refetchQueries: [{query: ALL_USERS_QUERY}]
  // })

  const [resetUsers] = useMutation(RESET_USERS)


 

  useEffect(() => {
    resetUsers(true)
    if (data) {
      // resetUsers(true)
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
      // resetUsers(true)
    }
  }, [data])

    if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const handleSelectedUsers = (revisedUsers) => {
    console.log("inside handleSelectedUser allUsersData", allUsersData)
    console.log("inside handleSelectedUser revisedUsers", revisedUsers)
    const filterByChecked = revisedUsers.filter(user => user.isChecked === true)
    console.log("filterByChecked", filterByChecked)
    setSelectedUsers(filterByChecked)
    console.log(selectedUsers, "selectedUsers", allUsersData, "all inside handleSelected")
  }

  const handleCheck = (id) => {
    // console.log("checked!")
    // console.log("id", id)
    // console.log("isChecked", isChecked)
    const revisedUsers = allUsersData.map (user => {
      if (user.id === id) {
        const updatedUser = {
          ...user,
          isChecked : !user.isChecked
        }
        // const toggleSelectedUser = updatedUser.isChecked ? updatedUser : []
        // setSelectedUser(toggleSelectedUser)
        return updatedUser;
      } else {
        return user;
      }
    })
    console.log('revisedUsers1 inside handleCheck', revisedUsers)
    setAllUsersData(revisedUsers)
    console.log("revisedUsers2 inside handleCheck", revisedUsers)
    console.log("allUsersData1", allUsersData)
    handleSelectedUsers(revisedUsers);
    console.log("allUsers last in function", allUsersData)
  }

  // deleteUser 
    // pass in selectedUsers 
      // forEach user, find in state and splice out 

  // const deleteUser = (selectedUsers) => {
  //   selectedUsers.forEach(user => {
  //     if (allUsersData.includes(user)) {
  //       allUsersData.splice(user)
  //     }
  //     console.log("allUserDataDelete", allUsersData)
  //   })
  // }
  const handleDelete = () => {
    // e.preventDefault();
    console.log("deleted1")
    console.log("selectedUsers1", selectedUsers)
    const emails = selectedUsers.map(selectedUser => {
      return selectedUser.email;
    })
    deleteUsers({ variables : { emails }})
    // window.location.reload
    console.log("deleted2")
    console.log("data", data)
    console.log("allUsersData", allUsersData)
    console.log('selectedUsers', selectedUsers)
    const removedSelected = allUsersData.reduce((acc, user) => {
      console.log("user", user)
      selectedUsers.forEach(selectedUser => {
        console.log("selectedUser", selectedUser)
        if (!user.isChecked && !acc.includes(user)) {
          acc.push(user)
        }
      })
      console.log("Acc", acc)
      return acc;
    }, [])
    console.log("removedSelected", removedSelected)
    setAllUsersData(removedSelected)
    setSelectedUsers([])
  }

  return (
    <main>
      <section className="content-container">
        <Header selectedUsers={selectedUsers} handleDelete={handleDelete} />
        <Container allUsersData={allUsersData} handleCheck={handleCheck} />
      </section>
    </main>
  )
}

export default App;