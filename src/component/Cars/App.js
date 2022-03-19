import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Filter from '../Filter';
import Cars from './Cars';
import { HOST } from '../../utils/var';
import { showAlert, showModal } from '../../actions'
import '../../css/App.css';
import Loader from '../Placeholder';

function App({
  authToken: auth,
  alartUser,
  showLoginModal
}) {
  const [carList, updateCarlist] = useState(null);

  useEffect(() => {
    const carsConfig = auth.loggedIn
    ?
    {
      url: `${HOST}/cars_favs/${auth.username}`,
      updateState: data => {
        const cars = [...data.cars];
        let carsCopy = [...data.cars];
        // loop though each car and check if it has been favourited
        data.favourites.forEach(id => {
          carsCopy.every((car, index) => {
            if (car.id === id.car_id) {
              cars[index] = {
                ...car,
                faved: true,
              }
              // since all cars in fav
                carsCopy.slice(index);
              return false;
            }

            return true;
          });
        });

        updateCarlist(cars);
      }
    }
    :
    {
      url: `${HOST}/cars`,
      updateState: data => updateCarlist(data),
    }

    const getData = () => {
      fetch(carsConfig.url,{
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
            carsConfig.updateState(data);
          })
        } else if (response.status.toString() === '401') {
          showLoginModal();
        }
        else {
          alartUser({message: 'there seems to be a problem', positiveOutcome: false});
        }
      }).catch(function(error) {
        alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false});
      });
  }
    getData();

    return null;
  }, [auth.loggedIn, auth.username, auth.token, alartUser, showLoginModal]);

  const cars = carList 
  ? <Cars carList={carList} />
  : <Loader />

  return (
    <div className="App">
      <Header heading={'Cars'} />
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
  },
  showLoginModal: () => {
    dispatch(showModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
