import React from 'react';
import favouritedIcon from '../img/favourited.svg';
import unfavouritedIcon from '../img/unfavourited.svg';
import '../css/Favourite.css';
// import { HOST } from '../utils/var';

const FavIcon = ({
  favourited,
  car,
  onFavClick
}) => {

  const handlClick = () => {
    // const credentials = {
    //   car_id: carID
    // }

    onFavClick(car, favourited);

    // const url = HOST + '/favourites';
    // await fetch(url,
    //   {
    //     method: "POST",
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //       Authorization: auth.token,
    //     },
    //     body: JSON.stringify(credentials),
    //   }).then(response => {
    //   if (response.status.toString() === '201') {
    //     alartUser({message: 'added to favourites', positiveOutcome: true})
    //   } 
    //   else {
    //     response.json().then(data => {
    //       alartUser({message: data.errors, positiveOutcome: false});
    //     });
    //   }
    // }).catch(function(error) {
    //   alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false})
    // });
  }

  return (
    <img onClick={handlClick} src={favourited ? favouritedIcon : unfavouritedIcon} className='fv-icon' alt='favourite icon'></img>
  );
};

FavIcon.defaultProps = {
  favourited: false
}

export default FavIcon;
