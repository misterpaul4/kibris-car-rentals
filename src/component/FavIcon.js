import React from 'react';
import { connect } from 'react-redux';
import favouritedIcon from '../img/favourited.svg';
import unfavouritedIcon from '../img/unfavourited.svg';
import '../css/Favourite.css';
// import { HOST } from '../utils/var';
import { showAlert } from '../actions';

const FavIcon = ({
  favourited,
  authToken: auth,
  // alartUser
}) => {

  const handlClick = async () => {
    // const credentials = {
    //   car_id: carID
    // }

    if (auth.loggedIn) {
      console.log('favourite button clicked');
    }

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

const mapStateToProps = state => ({
  authToken: state.auth
});

const mapDispatchToProps = dispatch => ({
  alartUser: status => {
    dispatch(showAlert(status));
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(FavIcon);
