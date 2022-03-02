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
                faved: true
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

  const renderCar = () => carList ? <Cars carList={carList}/> : <span>...loading</span>
  
  return (
    <div className="App">
      <Header heading={'Cars'} />
      <Filter />
      <div className='d-flex justify-content-center'>
        {renderCar()}
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
