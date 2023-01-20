import React from 'react';
import './Container.css';
import Row from '../Row/Row.js';

const Container = ({ allUsersData }) => {

  const allUsersRows = allUsersData.map(user => {
    return (
      <Row
        key={user.email}
        email={user.email}
        name={user.name}
        role={user.role}
      />
    )
  })

  // const allUsersRows = allUsersData.map(user => {
  //   return (
  //     <tr key={user.email}>
  //       <td>{user.email}</td>
  //       <td>{user.name}</td>
  //       <td>{user.role}</td>
  //     </tr>
  //   )
  // })

  return (
    // <div className="container">
    //   <p>I'm the container</p>
    //   {allUsersRows}
    // </div>
    <div className="table">
      <table>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {allUsersRows}
      </table>
    </div>
  )
}

export default Container;