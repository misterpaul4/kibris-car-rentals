import React from 'react';
import '../css/Header.css';

const Header = () => {

  return (
  <header className='p-2 border bg-light'>
    <div className='d-flex justify-content-between align-items-center'>
      <div>
        menu
      </div>

      <h4 className='align-self-end'>
        Tit
      </h4>

      <div className='rounded border py-2 px-2'>
        AV
      </div>
    </div>
  </header>
  )
};

export default Header;
