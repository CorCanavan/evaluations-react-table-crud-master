import React from 'react';
import './Header.css';

const Header = () => {

  return (
    <header className="header">
      <h1>I'm the header!</h1>
        <div className="button-wrapper">
          <button>Delete</button>
        </div>
    </header>
  )
}

export default Header;