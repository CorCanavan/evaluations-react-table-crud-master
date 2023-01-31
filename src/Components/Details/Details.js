import React from 'react';
import './Details.css';

const Details = ({ userToEdit, allRoles, formatRole}) => {

  const roleRadioButtons = allRoles.map(enumRole => {
    return (
      <label className="radio-label">
        <input
          className="radio-input"
          key={enumRole.name}
          type="radio"
          name="role"
          value={enumRole.name}
          checked={userToEdit.role === formatRole(enumRole.name)}
        />
        {formatRole(enumRole.name)}
      </label>
    )
  })

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
      </article>
      <article className="role-article">
        <label className="role-input-label">
          Role
        </label>
          {roleRadioButtons}
      </article>
    </section>
  )
}


export default Details;