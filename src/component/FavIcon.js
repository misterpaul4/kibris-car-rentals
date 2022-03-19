import React, {useState} from 'react';
import { connect } from 'react-redux';
import favouritedIcon from '../img/favourited.svg';
import unfavouritedIcon from '../img/unfavourited.svg';
import { HOST } from '../utils/var';
import { showAlert, showModal } from '../actions';
import '../css/Favourite.css';

const FavIcon = ({
  favourited,
  car,
  authToken: auth,
  alartUser,
  showLoginModal
}) => {
  const [favourite, updateFavourite] = useState(favourited);

  const handlClick = () => {
    // onFavClick(car, favourite, updateFavourite);
    const favTrue = {
      method: "DELETE",
      requestStatus: "204",
      successMessage: "removed from favourites",
    };
  
    const favFalse = {
      method: "POST",
      requestStatus: "201",
      successMessage: "added to favourites"
    };
    const apiRequestConfig = favourite ? favTrue : favFalse;

    const credentials = {
      car_id: car.id
    };

    const apiFetch = async () => {
      await fetch(`${HOST}/favourites`, {
        method: apiRequestConfig.method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: auth.token,
        },
        body: JSON.stringify(credentials),
      }).then(response => {
          if (response.status.toString() === apiRequestConfig.requestStatus) {
            // update
            updateFavourite(!favourite);
            alartUser({message: apiRequestConfig.successMessage, positiveOutcome: true});
          } else {
            response.json().then(data => {
              alartUser({message: data.errors, positiveOutcome: false});
            });
          }
        }).catch(error => {
          alartUser({message: "Looks like there was a problem. Please check your connection and try again.", positiveOutcome: false})
    })}
      
    if (auth.loggedIn) {
      apiFetch();
    } else {
      alartUser({message: "you are not logged in", positiveOutcome: false});
      showLoginModal();
    }
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

const mapStateToProps = state => ({
  authToken: state.auth
});

const mapDispatchToProps = dispatch => ({
  alartUser: status => {
    dispatch(showAlert(status));
  },
  showLoginModal: () => {
    dispatch(showModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FavIcon);

