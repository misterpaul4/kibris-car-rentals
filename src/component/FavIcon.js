import React, {useState} from 'react';
import favouritedIcon from '../img/favourited.svg';
import unfavouritedIcon from '../img/unfavourited.svg';
import '../css/Favourite.css';
// import { HOST } from '../utils/var';

const FavIcon = ({
  favourited,
  onFavClick,
  car
}) => {
  const [favourite, updateFavourite] = useState(favourited);

  const handlClick = () => {
    onFavClick(car, favourite, updateFavourite);
  }

  return (
    <img onClick={handlClick}
    src={favourite ? favouritedIcon : unfavouritedIcon}
    className='fv-icon' alt='favourite icon'></img>
  );
};

FavIcon.defaultProps = {
  favourited: false
}

export default FavIcon;
