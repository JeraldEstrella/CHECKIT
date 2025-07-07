import HomeIcon from '@rsuite/icons/legacy/Home';
import GroupIcon from '@rsuite/icons/legacy/Group';
import PlusIcon from '@rsuite/icons/Plus';
import TagIcon from '@rsuite/icons/legacy/Tag';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import SignOutIcon from '@rsuite/icons/legacy/SignOut';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import './sidebar.css';

const SideBar = () => {
  const [expanded, setExpanded] = useState(true);
  const [showAddContainer, setShowAddContainer] = useState(false);
  const [drop, setDrop] = useState(false);
  const userSearch = useState(true);

  const handleAddUser = (userName) => {
    alert(`Added ${userName}`);
  };

  return (
    <div
      className={`sidebar-container${expanded ? ' expanded' : ' collapsed'}`}
    >
      <div className="menu-list">
        <Link className="Link" to={'/'}>
          <HomeIcon />
          Home
        </Link>
        <div className="add-user">
          <Link
            className="Link"
            onClick={() => setShowAddContainer((prev) => !prev)}
          >
            <GroupIcon />
            Add user
          </Link>
          {showAddContainer && (
            <div className="add-container">
              <div className="input-container">
                <form action="">
                  <input type="text" autoFocus placeholder="Find user" />
                </form>
                <button>Search</button>
              </div>
              {userSearch && (
                <div className="find-users">
                  <div className="user">
                    <img src="./user.png" alt="User" />
                    <p>Jerald</p>
                    <button
                      className="add-btn"
                      onClick={() => handleAddUser('Jerald')}
                    >
                      Add
                    </button>
                  </div>
                  <div className="user">
                    <img src="./user.png" alt="User" />
                    <p>Jerald</p>
                    <button
                      className="add-btn"
                      onClick={() => handleAddUser('Jerald')}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Link className="Link" to="/submit">
          <PlusIcon />
          Create Post
        </Link>
        <div className="dropdown-container">
          <Link className="Link" onClick={() => setDrop(!drop)}>
            <GearCircleIcon />
            Settings
          </Link>
          <div className={`dropdown${drop ? ' show' : ''}`}>
            <Link className="Link" to="/settings/profile">
              <TagIcon />
              Profile
            </Link>
            <Link className="Link">
              <PlusIcon />
              Notifications
            </Link>
            <Link className="Link">
              <SignOutIcon />
              Logout
            </Link>
          </div>
        </div>
      </div>
      <div className="friendlist">
        <div className="user">
          <img src="./user.png" />
          <p>Jerald</p>
        </div>
        <div className="user">
          <img src="./user.png" />
          <p>Jerald</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
