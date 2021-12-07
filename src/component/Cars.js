import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import '../css/Cars.css';

const dummyUsers = [
  {
    'id': 1,
    'username': 'paul',
    'cars_uploaded': [],
    'favourites': []
  }
]

const dummyCars = [
  {
    "id": 1,
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
    "model": null,
    "image_url": null
  },
  {
    "id": 2,
    "three_day_rental_price": 100,
    "one_week_rental_price": 300,
    "one_month_rental_price": 2000,
    "delivery": 'yes',
    "fuel_type": 'petrol',
    "rental_requirements": null,
    "terms_and_conditions": null,
    "rental_company": "Durmazz",
    "status": "available",
    "manufacturer": "Benz",
    "model": null,
    "image_url": null
  },
  {
    "id": 3,
    "three_day_rental_price": 150,
    "one_week_rental_price": 400,
    "one_month_rental_price": 3000,
    "delivery": 'yes',
    "fuel_type": 'diesel',
    "rental_requirements": null,
    "terms_and_conditions": null,
    "rental_company": "KibTek",
    "status": "rented",
    "manufacturer": "BMW",
    "model": null,
    "image_url": null
},
{
  "id": 4,
  "three_day_rental_price": 150,
  "one_week_rental_price": 400,
  "one_month_rental_price": 3000,
  "delivery": 'yes',
  "fuel_type": 'diesel',
  "rental_requirements": null,
  "terms_and_conditions": null,
  "rental_company": "KibTek",
  "status": "rented",
  "manufacturer": "Porsche",
  "model": null,
  "image_url": null
},
{
  "id": 5,
  "three_day_rental_price": 150,
  "one_week_rental_price": 400,
  "one_month_rental_price": 3000,
  "delivery": 'yes',
  "fuel_type": 'diesel',
  "rental_requirements": null,
  "terms_and_conditions": null,
  "rental_company": "KibTek",
  "status": "rented",
  "manufacturer": "Jaguar",
  "model": null,
  "image_url": null
},
]

const Cars = () => {
  const [currentCarIndex, updateCarIndex] = useState(1);

  const randColor = () => {
    return ("#" + Math.floor(Math.random()*16777215).toString(16));
  }

  const AttachCars = (car, index) => {
    return (
      <Carousel.Item className='border' key={index}>
        {/* image */}
        <div className='car-img' style={
          {
            background: randColor()
          }
        }>
        </div>

        {/* info */}
        <div className='car-details text-light'>
        </div>
     </Carousel.Item> 
    )
  }

  return (
    <div>
      <Carousel interval={null} indicators={false} className='p-3' onSlide={index => {
        updateCarIndex(index + 1);
      }}>
        {dummyCars.map(AttachCars)}
      </Carousel>

      <div className='text-center'>
        {currentCarIndex} / {dummyCars.length}
      </div>
    </div>
  );
}

export default Cars;
