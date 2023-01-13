import React from 'react';
import './Row.css';

const Row = ({ email, name, role }) => {

  return (
    <div className="row">
      <p>{email}</p>
      <p>{name}</p>
      <p>{role}</p>
    </div>
  )
}

export default Row;