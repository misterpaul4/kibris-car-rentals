import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import tempCarImg from '../img/temp_car.jpg';
import { moneyWithCommas } from '../utils/util';
import FvIcon from './FavIcon';
import { toSnakeCase } from '../utils/util';
import '../css/Cars.css';

const Cars = props => {
  const dummyCars = props.carsArr
  const [currentCarIndex, updateCarIndex] = useState(1);

  const AttachCars = (car, index) => {
    return (
      <Carousel.Item className='border' key={index}>
        {/* image */}
        <Link to={`/cars/${car.id}/${toSnakeCase(car.rental_company)}/${toSnakeCase(car.manufacturer)}/${toSnakeCase(car.model)}`}>
          <div className='car-img bg-img' style={{backgroundImage: `url(${tempCarImg})`}}>
          </div>
        </Link>
  
        {/* info */}
        <div className='car-details p-3 text-dark'>
          <div className='d-flex justify-content-between'>
            <div>{car.manufacturer}, {car.model}</div>
            <div className='car-details-pricing'>₺ {moneyWithCommas(car.daily_rental_price)}
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
      <Carousel interval={null} indicators={false} className='p-3' onSlide={index => {
        updateCarIndex(index + 1);
      }}>
        {dummyCars.map(AttachCars)}
      </Carousel>

      <div className='text-center m-3'>
        {currentCarIndex} / {dummyCars.length}
      </div>
    </div>
  );
}

export default Cars;
