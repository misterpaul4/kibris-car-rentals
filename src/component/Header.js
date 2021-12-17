import React from 'react';
import menuIcon from '../img/menu.svg';
import searchIcon from '../img/search.svg';
import '../css/Header.css';

const Header = () => {

  return (
  <header className='p-2 border bg-light'>
    <div className='d-flex justify-content-between align-items-center px-3'>
      <img src={menuIcon} alt='menu icon'></img>

      <h4 className='align-self-end'>
        Cars
      </h4>

      <img src={searchIcon} alt='search icon'></img>
    </div>
  </header>
  )
};

export default Header;
