import React from 'react';
import favouritedIcon from '../img/favourited.svg';
import unfavouritedIcon from '../img/unfavourited.svg';
import '../css/Favourite.css';

const FavIcon = () => {
  return (
    <img src={unfavouritedIcon} className='fv-icon'></img>
  );
}

export default FavIcon;
