import React from 'react';
import './Details.css';


const Details = ({ email, name, role, id}) => {

  console.log('email', email)
  console.log('name', name)
  console.log('role', role)
  console.log('id', id)
  
  return (
    <section className="details-container">
      {/* <h1>{email}</h1> */}
      <article className="name-article">
        {name}
      </article>
      <article className="role-article">
        {role}
      </article>
    </section>
  )
}


export default Details;