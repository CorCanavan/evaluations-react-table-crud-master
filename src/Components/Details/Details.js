import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import './Details.css';

// const ROLES_QUERY = gql`
//   query {
//     __type(name: "Role") {
//       name
//       enumValues {
//         name
//       }
//     }
//   }
// `;

const Details = ({ email, name, role, id}) => {

  // const {loading, error, data} = useQuery(ROLES_QUERY)

  console.log('email', email)
  console.log('name', name)
  console.log('role', role)
  console.log('id', id)

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
            defaultValue={name}
            // value={name}
          />
        {/* </label> */}
      </article>
      <article className="role-article">
        {role}
      </article>
    </section>
  )
}


export default Details;