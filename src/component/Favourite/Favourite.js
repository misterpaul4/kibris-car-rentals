import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Filter from '../Filter';
import Cars from './Cars';
import { showAlert } from '../../actions';
import { HOST } from '../../utils/var';

function App({
  authToken: auth,
  alartUser
}) {
  const [carList, updateCarlist] = useState(null);

  useEffect(() => {
    const url = `${HOST}/users/${auth.username}/favourites`;

    const getData = () => {
      fetch(url,{
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: auth.token
        }
      }).then(response => { 
        if (response.status.toString() === '200') {
          response.json().then(data => {
            updateCarlist(data);
          })
        } 
        else {
          alartUser({message: 'there seems to be a problem', positiveOutcome: false});
        }
      }).catch(function(error) {
        alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false});
      });
  }

    if (auth.loggedIn) {
      getData();
    } else {
      alartUser({message: "you are not logged in", positiveOutcome: false})
    }

    return null;
  }, [auth, alartUser]);

  const handleFavouriteClick = (car, index, carsCarList, updateCarsCarlist) => {
    const credentials = {
      car_id: car.id
    };

    const apiFetch = async () => {
      await fetch(`${HOST}/favourites`, {
        method: "DELETE",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: auth.token,
        },
        body: JSON.stringify(credentials),
      }).then(response => {
          if (response.status.toString() === "204") {
            // REMOVE CAR;
            alartUser({message: "removed from favourites", positiveOutcome: true});
            let newCarList = [...carsCarList]
            newCarList.splice(index, 1);
            updateCarsCarlist(newCarList);
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
      alartUser({message: "you are not logged in", positiveOutcome: false})
    }
  };

  const cars = carList ? <Cars carList={carList} onFavClick={handleFavouriteClick} /> : <span>...loading</span>

  return (
    <div className="App">
      <Header heading={'Favourites'} />
      <Filter />
      <div className='d-flex justify-content-center'>
        {cars}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  authToken: state.auth
});

const mapDispatchToProps = dispatch => ({
  alartUser: status => {
    dispatch(showAlert(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
