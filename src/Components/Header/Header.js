import React from 'react';
import './Header.css';

const Header = ({ selectedUsers, handleDelete, userToEdit}) => {
  const isDetailsView = !!userToEdit;
  const headerTitle = isDetailsView ? userToEdit.email : 'Users';
  const saveButton = (<button className="save-btn">Save</button>);
  const setDeleteButton = () => {
    if (selectedUsers.length) {
      return (<button className="active" onClick={handleDelete}>Delete</button>)
    } else {
      return (<button disabled>Delete</button>)
    }
  }

  return (
    <>
    <header className="header">
      <h1 className="header-text">{headerTitle}</h1>
        <div className="button-wrapper">
          {isDetailsView ? saveButton : setDeleteButton()}
        </div>
    </header>
    </>
  )
}

export default Header;