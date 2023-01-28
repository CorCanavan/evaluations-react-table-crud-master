import React from 'react';
import './Details.css';


const Details = ({ email, name, role, id}) => {

  console.log('email', email)
  
  return (
    <div className="details">
      <h1>{email}</h1>
    </div>
  )
}


export default Details;