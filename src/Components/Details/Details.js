import React from 'react';
import './Details.css';

const Details = ({ setUserToEdit, userToEdit, allRoles, formatRole}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserToEdit(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const roleRadioButtons = allRoles.map(enumRole => {
    return (
      <label className="radio-label" key={formatRole(enumRole.name)}>
        <input
          key={enumRole.name}
          className="radio-input"
          type="radio"
          name="role"
          value={enumRole.name}
          defaultChecked={userToEdit.role === formatRole(enumRole.name)}
          // onChange={(e) => setUserToEdit({...userToEdit, role: e.target.value})}
          onChange={(e) => handleChange(e)}
          // onChange={(e) => setUserToEdit(e.target.value)}
          // does value have to be in enum format?
        />
        {formatRole(enumRole.name)}
      </label>
    )
  })

  return (
    <section className="details-container">
      <article className="name-article">
        <label className="name-input-label">
          Name
        </label>
          <input className="name-input"
            name="name"
            type="text"
            defaultValue={userToEdit.name}
            // value={name}
            onChange={(e) => handleChange(e)}
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