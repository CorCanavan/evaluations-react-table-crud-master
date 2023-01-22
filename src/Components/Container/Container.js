import React from 'react';
import './Container.css';
import Row from '../Row/Row.js';

const Container = ({ allUsersData }) => {

  const allUsersRows = allUsersData.map(user => {
    return (
      <Row
        key={user.id}
        id={user.id}
        email={user.email}
        name={user.name}
        role={user.role}
      />
    )
  })

  return (
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