import React from 'react';
import './Details.css';

const Details = ({ userToEdit, allRoles, formatRole}) => {

  // const formatRole = (enumRole) => {
  //   const revisedRole = enumRole.split("_")
  //   return revisedRole.map(role => {
  //     return role[0] + role.substring(1).toLowerCase();
  //   }).join(" ")
  // }

  // console.log("formatRole", formatRole('APP_MANAGER'))

  console.log("allRoles", allRoles)
  // const roleRadioButtons = data.__type.enumValues.map(enumRole => {
  //   <input
  //     type="radio"
  //     name="role"
  //     value={enumRole}

  //   />
  // })

  return (
    <section className="details-container">
      {/* <h1>{email}</h1> */}
      <article className="name-article">
        <label className="name-input-label">
          Name
        </label>
          <input className="name-input"
            name="name"
            type="text"
            defaultValue={userToEdit.name}
            // value={name}
          />
        {/* </label> */}
      </article>
      <article className="role-article">
        {userToEdit.role}
      </article>
    </section>
  )
}


export default Details;