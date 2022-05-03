import React from "react";
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';
import { moneyWithCommas } from '../../utils/util';
import favouritedIcon from '../../img/favourited.svg';
import { toSnakeCase } from '../../utils/util';
import '../../css/Cars.css';

const CarCard = ({
  car,
  onFavClick,
  index,
  carsCarList,
  updateCarsCarlist,
}) => {

  const handleFavRemoval = () => onFavClick(car, index, carsCarList, updateCarsCarlist);

  const { className, availability } = car.availability === "true" ? {
    className: "cl-green",
    availability: "available"
  } : 
  {
    className: "cl-red",
    availability: "rented"
  }

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
            <img onClick={handleFavRemoval} src={favouritedIcon} className='fv-icon' alt='favourite icon'></img>
          </div>

          <div className={className}>
              {availability}
          </div>
        </div>
      </div>
      </>
  )
}

export default CarCard;
