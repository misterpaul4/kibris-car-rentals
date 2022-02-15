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
  authToken: auth,
  alartUser
}) => {
  const [currentCarIndex, updateCarIndex] = useState(1);
  const [carList, updateCarlist] = useState(null);

  useEffect(() => {
    const url = `${HOST}/cars`;
  
    fetch(url).then(response => {
      if (response.status.toString() === '200') {
        response.json().then(data => {
          updateCarlist(data);
        })
      } 
      else {
        alartUser({message: 'Looks like there was a problem. Please try again', positiveOutcome: false})
      }
    }).catch(function(error) {
      alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false})
    });
  
    return null;
  }, [alartUser]);

  const AttachCars = (car, index) => {
    return (
      <Carousel.Item className='border' key={index}>
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
              <FvIcon />
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
        carList ?
        <>
        <Carousel interval={null} indicators={false} className='p-3' onSlide={index => {
          updateCarIndex(index + 1);
        }}>
          {carList.map(AttachCars)}
        </Carousel>
  
        <div className='text-center m-3'>
          {currentCarIndex} / {carList.length}
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
