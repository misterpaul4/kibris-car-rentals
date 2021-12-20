import React from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../img/menu.svg';
import favourites from '../img/favourites.svg';
import '../css/Header.css';

const dummyUser = [
  {
    'id': 1,
    'username': 'paul',
    'cars_uploaded': [],
    'favourites': []
  }
]



const Header = props => {

  return (
  <header className='p-2'>
    <div className='d-flex justify-content-between align-items-center px-3'>
      <img src={menuIcon} alt='menu icon'></img>

      <h4>
        {props.heading}
      </h4>

      <Link to={`/user/${dummyUser[0].id}/cars/favourites`}>
        <img src={favourites} alt='search icon'></img>
      </Link>
    </div>
  </header>
  )
};

export default Header;
