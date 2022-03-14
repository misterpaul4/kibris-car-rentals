import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import menuIcon from '../img/menu.svg';
import favourites from '../img/favourites.svg';
import '../css/Header.css';
import avatar from '../img/profileAvatar.png';
import { logout } from '../actions';

const Header =  ({
  authToken: auth,
  logoutUser,
  heading
}) => {

  const authAction = () => {
    localStorage.clear();
    logoutUser();
  }

  const { username, authType } = auth.loggedIn ? {
    username: auth.username,
    authType: 'Logout'
  } :
  {
    username: 'anonymous',
    authType: 'Login'
  }

  return (
  <header className='p-2'>
    <div className='d-flex justify-content-between align-items-center px-3'>
      <img src={menuIcon} alt='menu icon'
      className='menuBtn'
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
      ></img>

    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

      <div className="offcanvas-header">
        <div></div>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body">
      <img src={avatar} className="profile-avatar mx-4" id="offcanvasExampleLabel" alt='user avatar'></img>
      <div className=' mx-4'>@{username}</div>
      <ul className='mt-5 nav-list p-0'>
        <Link to='/'>
          <li className='px-4 py-2'>Home</li>
        </Link>

        <Link to={`/users/${username}/cars/favourite`}>
          <li className='px-4 py-2'>Favourites</li>
        </Link>
        <li className='px-4 py-2'>Profile</li>
        <li className='px-4 py-2'>Settings</li>
      </ul>

      <div className="mt-5">
        <hr></hr>
        <Link to='/login' onClick={authAction} className=' mx-4'>{authType}</Link>
      </div>
      </div>
    </div>

      <h4>
        {heading}
      </h4>

      <Link to={`/users/${auth.username}/cars/favourite`}>
        <img src={favourites} alt='search icon'></img>
      </Link>
    </div>
  </header>
  )
};

const mapStateToProps = state => ({
  authToken: state.auth
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);