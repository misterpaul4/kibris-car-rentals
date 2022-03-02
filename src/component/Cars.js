import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import CarCard from './CarCard';
import '../css/Cars.css';

const Cars = ({carList}) => {
  const [currentCarIndex, updateCarIndex] = useState(1);

  // const AttachCars = car => {
  //   return (
  //     <Carousel.Item className='border' key={car.id}>
  //       {/* image */}
  //       <Link to={`/cars/${car.id}/${toSnakeCase(car.rental_company)}/${toSnakeCase(car.manufacturer)}/${toSnakeCase(car.model)}`} >
  //         <div className='car-img bg-img' style={{backgroundImage: `url(${car.image_url})`}}>
  //         </div>
  //       </Link>
  
  //       {/* info */}
  //       <div className='car-details p-3 text-dark'>
  //         <div className='d-flex justify-content-between'>
  //           <div>{car.manufacturer}, {car.model}
  //           <br></br><small><em>{car.model_year} </em> model</small>
  //           </div>
  //           <div className='car-details-pricing'>
  //             {getSymbolFromCurrency(car.currency)} {parseInt(moneyWithCommas(car.daily_rental_price))}
  //             <br></br><small><em>per day</em></small>
  //           </div>
  //         </div>

  //         <div className='d-flex justify-content-between align-items-end mt-3'>
  //           <div>
  //             <FvIcon carID={car.id} favourited={car.faved}/>
  //           </div>

  //           <div className={car.availability === 'false' ? 'cl-red' : 'cl-green'}>
  //               {car.availability === 'true' ? 'available' : 'rented' }
  //           </div>
  //         </div>
  //       </div>
  //    </Carousel.Item> 
  //   )
  // }


  const onCarouselSlide = index => updateCarIndex(index + 1);

  const renderCarCard = carList.map(car => (
    <Carousel.Item className='border' key={car.id}>
      <CarCard car={car} key={car.id} />
    </Carousel.Item> 
  ))

  return (
    <div className='cars-container'>
      <Carousel interval={null} indicators={false} className='p-3' onSlide={onCarouselSlide}>
        {renderCarCard}
      </Carousel>

      <div className='text-center m-3'>
        {currentCarIndex} / {carList && carList.length}
      </div>
    </div>
  );
}

export default Cars;
