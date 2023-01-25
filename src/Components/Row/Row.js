import React from 'react';
import './Row.css';

const Row = ({ id, email, name, role, isChecked, handleCheck }) => {

  return (
    <tr key={email} className="row-wrapper">
      <td className="email" style={{color: isChecked ? "#0070c9" : "#333"}}>
        <label className="input-container">
          <input 
            type="checkbox" 
            value={isChecked}
            onChange={() => handleCheck(id)}
          />
          {email}
        </label>
      </td>
      <td className="name">{name}</td>
      <td>{role}</td>
    </tr>

  )
}

export default Row;