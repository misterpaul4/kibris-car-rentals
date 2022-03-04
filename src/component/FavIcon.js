import React, { useState, useEffect } from 'react';
import favouritedIcon from '../img/favourited.svg';
import unfavouritedIcon from '../img/unfavourited.svg';
import '../css/Favourite.css';
// import { HOST } from '../utils/var';

const FavIcon = ({
  favourited,
  car,
  onFavClick
}) => {
  const [favourite, updateFavourite] = useState(false);

  useEffect(() => {
    console.log("BUTTON MOUNTED OR UPDATED");
  
    updateFavourite(favourited);

  }, [favourited]);

  console.log("RENDERED");

  const handlClick = () => {
    console.log("BUTTON CLICKED");
    onFavClick(car, favourite, updateFavourite);
  }

  return (
    <img onClick={handlClick} src={favourite ? favouritedIcon : unfavouritedIcon} className='fv-icon' alt='favourite icon'></img>
  );
};

FavIcon.defaultProps = {
  favourited: false
}

export default FavIcon;
