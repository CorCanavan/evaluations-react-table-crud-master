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
    <section className="container">
      <table>
        <thead className="header-border">
          <tr className="column-headers">
            <th>EMAIL</th>
            <th>NAME</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {allUsersRows}
        </tbody>
      </table>
    </section>
  )
}

export default Container;