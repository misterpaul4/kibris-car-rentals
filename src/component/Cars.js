import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import Carousel from 'react-bootstrap/Carousel'
import { moneyWithCommas } from '../utils/util';
import FvIcon from './FavIcon';
import { toSnakeCase } from '../utils/util';
import { HOST } from '../utils/var';
import { showAlert } from '../actions';
import '../css/Cars.css';

const Cars = ({
  alartUser,
  authToken: auth,
}) => {
  const [currentCarIndex, updateCarIndex] = useState(1);
  const [carList, updateCarlist] = useState([]);
  const [fetched, updateFetched] = useState(false);

  useEffect(() => {
    const carsConfig = !auth.loggedIn
    ?
    {
      url: `${HOST}/cars`,
      updateState: data => updateCarlist(data),
    }
    : 
    {
      url: `${HOST}/cars_favs/${auth.username}`,
      updateState: data => {
        const tempCars = data.cars;
        const tempCars2 = [...data.cars];

        // data.favourites(favourited car ids) is already sorted from backend
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
            updateFetched(true);
          })
        } 
        else {
          alartUser({message: 'there seems to be a problem', positiveOutcome: false})
        }
      }).catch(function(error) {
        alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false})
      });;
    }

    getData();
  
    return null;
  }, [alartUser, auth]);

  const AttachCars = car => {
    return (
      <Carousel.Item className='border' key={car.id}>
        {/* image */}
        <Link to={`/cars/${car.id}/${toSnakeCase(car.rental_company)}/${toSnakeCase(car.manufacturer)}/${toSnakeCase(car.model)}`} >
          <div className='car-img bg-img' style={{backgroundImage: `url(${car.image_url})`}}>
          </div>
        </Link>
  
        {/* info */}
        <div className='car-details p-3 text-dark'>
          <div className='d-flex justify-content-between'>
            <div>{car.manufacturer}, {car.model}
            <br></br><small><em>{car.model_year} </em> model</small>
            </div>
            <div className='car-details-pricing'>
              {getSymbolFromCurrency(car.currency)} {parseInt(moneyWithCommas(car.daily_rental_price))}
              <br></br><small><em>per day</em></small>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-end mt-3'>
            <div>
              <FvIcon carID={car.id} favourited={car.faved}/>
            </div>

            <div className={car.availability === 'false' ? 'cl-red' : 'cl-green'}>
                {car.availability === 'true' ? 'available' : 'rented' }
            </div>
          </div>
        </div>
     </Carousel.Item> 
    )
  }

  return (
    <div className='cars-container'>
      {
        fetched ?
        <>
        <Carousel interval={null} indicators={false} className='p-3' onSlide={index => {
          updateCarIndex(index + 1);
        }}>
          {carList.map(AttachCars)}
        </Carousel>
  
        <div className='text-center m-3'>
          {currentCarIndex} / {carList && carList.length}
        </div>
        </>
        : <p className='text-center'>...loading</p>
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
