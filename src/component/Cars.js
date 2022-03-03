import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import CarCard from './CarCard';
import '../css/Cars.css';

const Cars = ({carList, onFavClick}) => {
  const [currentCarIndex, updateCarIndex] = useState(1);

  const onCarouselSlide = index => updateCarIndex(index + 1);

  const renderCarCard = carList.map(car => (
    <Carousel.Item className='border' key={car.id}>
      <CarCard car={car} key={car.id} onFavClick={onFavClick} />
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
