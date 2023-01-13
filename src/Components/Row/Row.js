import React from 'react';
import './Row.css';

const Row = ({ email, name, role }) => {

  return (
    <div className="row">
      <p className="info">{email}</p>
      <p className="info">{name}</p>
      <p className="info">{role}</p>
    </div>
  )
}

export default Row;