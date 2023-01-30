import React from 'react';
import './Row.css';
import { Link, useHistory } from 'react-router-dom';

const Row = ({ id, email, name, role, isChecked, handleCheck, handleEditUser }) => {

  // const history = useHistory();

  // const handleClickedUser = (name) => {
  //   history.push(`user/${email}`);
  // }

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
      {/* <Link to={`user/${email}`} className="name"> */}
        <td className="name" onClick={()=> handleEditUser(name)}>{name}</td>
               
      {/* </Link>  */}
      <td>{role}</td>
    </tr>

  )
}

export default Row;