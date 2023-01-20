import React from 'react';
import './Header.css';

const Header = () => {

  return (
    <header className="header">
      <h1 className="header-text">Users</h1>
        <div className="button-wrapper">
          <button className="delete">Delete</button>
        </div>
    </header>
  )
}

export default Header;