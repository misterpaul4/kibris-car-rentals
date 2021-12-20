import React from 'react';
import Header from '../component/Header';
import tempCar from '../img/temp_car.jpg';
import avatar from '../img/avatar.png';
import { moneyWithCommas } from '../utils/util';
import '../css/Cars.css';

const tempCarObj = {
  "id": 1,
  "daily_rental_price": 100,
  "three_day_rental_price": 300,
  "one_week_rental_price": 800,
  "one_month_rental_price": 6000,
  "delivery": 'yes',
  "fuel_type": 'petrol',
  "rental_requirements": 'Sunt voluptate exercitation eiusmod aliqua culpa. Veniam ipsum cupidatat et esse incididunt irure ad commodo et occaecat proident in esse. Eu minim excepteur id cupidatat mollit magna id officia amet elit officia excepteur aute. Magna magna consectetur fugiat sit excepteur non est aliqua. Veniam do enim sint occaecat. Eiusmod labore ut fugiat sit culpa proident. Ullamco sint irure dolor tempor deserunt velit adipisicing ullamco occaecat tempor quis et nulla sint.',
  "terms_and_conditions": "Nisi labore laborum sit ea labore. Sint duis proident adipisicing quis non officia do eu nostrud occaecat commodo sint. Id est nostrud in tempor fugiat. Pariatur consectetur labore excepteur est Lorem et est. Aute quis laboris sunt non irure esse eiusmod aliquip qui magna culpa eiusmod aliquip est. Dolor fugiat amet do ut dolore minim culpa culpa officia laborum nisi mollit ut do.",
  "rental_company": "Britico",
  "status": "available",
  "manufacturer": "Lamboghini",
  "model": 'Urus',
  "release_year": '2018',
  "image_url": null
}

const Car = () => {
  return (
    <div className='car-page-container d-flex flex-column justify-content-between'>
      <div className='car-page--child-container'>
        <Header heading={tempCarObj.rental_company} />
        <div className='d-flex flex-column align-items-center car-page'>
          {/* car image */}
          <div className='car-img bg-img' style={{backgroundImage: `url(${tempCar})`}}>
            <div className='bg-float d-flex justify-content-between align-items-center p-3 w-100'>
              {/* avatar & company */}
              <div>
                <img src={avatar} alt='rental company avatar' className='rental-company-AV'></img>
                <span>{tempCarObj.rental_company}</span>
              </div>

              {/* rental price */}
              <div className='lh-sm'>
                <span className='fw-bold fs-3'>₺ {moneyWithCommas(tempCarObj.daily_rental_price)}</span><br></br>
                <em>per day</em>
              </div>
            </div>
          </div>

          <div className='mt-4 container car-details'>
            <h2>About this rental</h2>
            <ul>
              <li>Manufacturer: <strong>{tempCarObj.manufacturer}</strong></li>
              <li>Model: <strong>{tempCarObj.model}, {tempCarObj.release_year} model</strong></li>
              <li>Delivery: <strong>{tempCarObj.delivery}</strong></li>
              <li>Fuel type: <strong>{tempCarObj.fuel_type}</strong></li>
            </ul>

            <h2>Pricing</h2>
            <ul>
              <li>3 days rental price: <strong>₺{moneyWithCommas(tempCarObj.three_day_rental_price)}</strong></li>
              <li>1 week rental price: <strong>₺{moneyWithCommas(tempCarObj.one_week_rental_price)}</strong></li>
              <li>Monthly rental price: <strong>₺{moneyWithCommas(tempCarObj.one_month_rental_price)}</strong></li>
            </ul>
            {
              tempCarObj.terms_and_conditions ?
              <><h2>Terms & conditions</h2>
              <p>{tempCarObj.terms_and_conditions}</p>
              </> :
              null
            }

            {
              tempCarObj.rental_requirements ?
              <><h2>Rental requirements</h2>
              <p>{tempCarObj.rental_requirements}</p>
              </> :
              null
            }
          </div>
        </div>
      </div>

      <button className={tempCarObj.status === 'rented' ? 'rent-btn-container text-center p-2 mt-2 align-self-center bg-red' : 'bg-green rent-btn-container text-center p-2 mt-2 align-self-center'}>
        {
          tempCarObj.status === 'rented' ?
          'Rented' : 
          'Apply to rent'
        }
      </button>
    </div>
  );
}

export default Car;
