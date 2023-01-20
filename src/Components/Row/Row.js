import React from 'react';
import './Row.css';

const Row = ({ email, name, role }) => {

  return (
    // <article className="row">
    //   <label className="info">
    //     <input 
    //       type="checkbox" 
    //     />
    //     {email}
    //   </label>
    //   {/* <p className="info">{email}</p> */}
    //   <p className="info">{name}</p>
    //   <p className="info">{role}</p>
    // </article>

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