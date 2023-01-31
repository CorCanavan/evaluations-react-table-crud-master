import React from 'react';
import './Row.css';

const Row = ({ id, email, name, role, isChecked, handleCheck, handleEditUser }) => {

  return (
    <tr key={email} className="row-wrapper">
      <td className="email" style={{color: isChecked ? "#0070c9" : null}}>
        <label className="input-container">
          <input className="checkbox"
            type="checkbox" 
            value={isChecked}
            onChange={() => handleCheck(id)}
          />
          {email}
        </label>
      </td>
      <td className="name" onClick={()=> handleEditUser(name)}>{name}</td>
      <td>{role}</td>
    </tr>

  )
}

export default Row;