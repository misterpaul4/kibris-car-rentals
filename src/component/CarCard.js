import React from "react";
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import getSymbolFromCurrency from 'currency-symbol-map';
import { moneyWithCommas } from '../utils/util';
import FvIcon from './FavIcon';
import { toSnakeCase } from '../utils/util';
import '../css/Cars.css';

const CarCard = ({
  car
}) => {

  return (
    <>
      <Link to={`/cars/${car.id}/${toSnakeCase(car.rental_company)}/${toSnakeCase(car.manufacturer)}/${toSnakeCase(car.model)}`} >
        <div className='car-img bg-img' style={{backgroundImage: `url(${car.image_url})`}}>
        </div>
      </Link>

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
      </>
  )
}

export default CarCard;
