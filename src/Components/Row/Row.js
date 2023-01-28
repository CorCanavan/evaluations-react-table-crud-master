import React from 'react';
import './Row.css';
import { Link } from 'react-router-dom';

const Row = ({ id, email, name, role, isChecked, handleCheck }) => {

  return (
    <tr key={email} className="row-wrapper">
      <td className="email" style={{color: isChecked ? "#0070c9" : null}}>
        <label className="input-container">
          <input 
            type="checkbox" 
            value={isChecked}
            onChange={() => handleCheck(id)}
          />
          {email}
        </label>
      </td>
      <Link to={`user/${email}`} className="name">
        <td className="name">{name}</td>
      </Link> 
      <td>{role}</td>
    </tr>

  )
}

export default Row;