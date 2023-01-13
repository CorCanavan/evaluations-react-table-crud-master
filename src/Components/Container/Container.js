import React from 'react';
import './Container.css';
import Row from '../Row/Row.js';

const Container = ({ allUsersData }) => {

  const allUsersRows = allUsersData.map(user => {
    return (
      <Row
        email={user.email}
        name={user.name}
        role={user.role}
      />
    )
  })

  return (
    <div className="container">
      <p>I'm the container</p>
      {allUsersRows}
    </div>
  )
}

export default Container;