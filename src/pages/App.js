import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../css/App.css';
import Header from '../component/Header';
import Filter from '../component/Filter';
import Cars from '../component/Cars';
import { HOST } from '../utils/var';
import { showAlert } from '../actions';

function App({
  authToken: auth,
  alartUser
}) {
  const [carList, updateCarlist] = useState(null);
  // const [favUpdated, updateFavourited] = useState(false);

  useEffect(() => {
    const carsConfig = auth.loggedIn
    ?
    {
      url: `${HOST}/cars_favs/${auth.username}`,
      updateState: data => {
        const tempCars = data.cars;
        let tempCars2 = [...data.cars];

        data.favourites.forEach(id => {
          tempCars2.every((car, index) => {
            if (car.id === id.car_id) {
              tempCars[index] = {
                ...car,
                faved: true,
                favID: id.id
              }
                tempCars2.slice(index);
              return false;
            }

            return true;
          });
        });

        updateCarlist(tempCars);
      }
    }
    :
    {
      url: `${HOST}/cars`,
      updateState: data => updateCarlist(data),
    }

    const getData = async () => {
      await fetch(carsConfig.url,{
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
  }, [auth, alartUser]);

  const handleFavouriteClick = (car, favourited) => {
    const favTrue = {
      url: `${HOST}/favourites/${car.favID}`,
      method: "DELETE",
      requestStatus: "204",
      successMessage: "removed from favourites"
    };
  
    const favFalse = {
      url: `${HOST}/favourites`,
      method: "POST",
      requestStatus: "201",
      successMessage: "added to favourites"
    };
    const apiRequestConfig = favourited ? favTrue : favFalse;

    const credentials = {
      car_id: car.id
    };

    const apiFetch = async () => {
      await fetch(apiRequestConfig.url, {
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
            alartUser({message: apiRequestConfig.successMessage, positiveOutcome: true})
          } else {
            response.json().then(data => {
              alartUser({message: data.errors, positiveOutcome: false});
            });
          }
        }).catch(error => {
          alartUser({message: "Looks like there was a problem. Please check your connection and try again.", positiveOutcome: false})
        })
    }

    if (auth.loggedIn) {
      apiFetch();
    } else {
      alartUser({message: "you are not logged in", positiveOutcome: false})
    }
  };

  const cars = carList ? <Cars carList={carList} onFavClick={handleFavouriteClick} /> : <span>...loading</span>
  
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
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
