import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import Carousel from 'react-bootstrap/Carousel'
import tempCarImg from '../img/temp_car.jpg';
import { moneyWithCommas } from '../utils/util';
import FvIcon from './FavIcon';
import { toSnakeCase } from '../utils/util';
import { HOST } from '../utils/var';
import { showAlert } from '../actions';
import '../css/Cars.css';


const dummyCars = [
  {
    "id": 1,
    "daily_rental_price": 100,
    "three_day_rental_price": 300,
    "one_week_rental_price": 800,
    "one_month_rental_price": 6000,
    "delivery": 'yes',
    "fuel_type": 'petrol',
    "rental_requirements": null,
    "terms_and_conditions": null,
    "rental_company": "Britico",
    "status": "available",
    "manufacturer": "Lamboghini",
    "model": 'Urus',
    "image_url": null
  },
  {
    "id": 2,
    "daily_rental_price": 200,
    "three_day_rental_price": 900,
    "one_week_rental_price": 300,
    "one_month_rental_price": 2000,
    "delivery": 'yes',
    "fuel_type": 'petrol',
    "rental_requirements": null,
    "terms_and_conditions": null,
    "rental_company": "Durmazz",
    "status": "available",
    "manufacturer": "Benz",
    "model": 'S-Class',
    "image_url": null
  },
  {
    "id": 3,
    "daily_rental_price": 90,
    "three_day_rental_price": 300,
    "one_week_rental_price": 400,
    "one_month_rental_price": 3000,
    "delivery": 'yes',
    "fuel_type": 'diesel',
    "rental_requirements": null,
    "terms_and_conditions": null,
    "rental_company": "KibTek",
    "status": "rented",
    "manufacturer": "BMW",
    "model": '7 Series',
    "image_url": null
},
{
  "id": 4,
  "daily_rental_price": 190,
  "three_day_rental_price": 800,
  "one_week_rental_price": 400,
  "one_month_rental_price": 3000,
  "delivery": 'yes',
  "fuel_type": 'diesel',
  "rental_requirements": null,
  "terms_and_conditions": null,
  "rental_company": "KibTek",
  "status": "rented",
  "manufacturer": "Porsche",
  "model": 'Taycan',
  "image_url": null
},
{
  "id": 5,
  "daily_rental_price": 300,
  "three_day_rental_price": 1150,
  "one_week_rental_price": 400,
  "one_month_rental_price": 3000,
  "delivery": 'yes',
  "fuel_type": 'diesel',
  "rental_requirements": null,
  "terms_and_conditions": null,
  "rental_company": "KibTek",
  "status": "rented",
  "manufacturer": "Jaguar",
  "model": 'XF',
  "image_url": null
},
]


const Cars = ({
  authToken: auth,
  alartUser
}) => {
  const [currentCarIndex, updateCarIndex] = useState(1);
  const [carList, updateCarlist] = useState([]);

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
        <Link to={`/cars/${car.id}/${toSnakeCase(car.rental_company)}/${toSnakeCase(car.manufacturer)}/${toSnakeCase(car.model)}`}>
          <div className='car-img bg-img' style={{backgroundImage: `url(${car.image_url})`}}>
          </div>
        </Link>
  
        {/* info */}
        <div className='car-details p-3 text-dark'>
          <div className='d-flex justify-content-between'>
            <div>{car.manufacturer}, {car.model}</div>
            <div className='car-details-pricing'>{getSymbolFromCurrency(car.currency)} {parseInt(moneyWithCommas(car.daily_rental_price))}
              <br></br><small><em>per day</em></small>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-end mt-3'>
            <div>
              <FvIcon />
            </div>

            <div className={car.status === 'rented' ? 'cl-red' : null}>
                {car.status}
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
