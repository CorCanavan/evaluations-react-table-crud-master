import React from 'react';
import './Row.css';

const Row = ({ email, name, role }) => {

  return (
    <tr key={email} className="row-wrapper">
      <td>
        <label className="input-container">
          <input 
            type="checkbox" 
          />
          {email}
        </label>
      </td>
      <td>{name}</td>
      <td>{role}</td>
    </tr>

  )
}

export default Row;