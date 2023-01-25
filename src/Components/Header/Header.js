import React from 'react';
import './Header.css';

const Header = ({ selectedUsers, handleDelete }) => {

  return (
    <header className="header">
      <h1 className="header-text">Users</h1>
        <div className="button-wrapper">
          {selectedUsers.length > 0 ? <button className="active" onClick={handleDelete}>Delete</button> : <button disabled>Delete</button>}
        </div>
    </header>
  )
}

export default Header;