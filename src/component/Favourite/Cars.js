import React, {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarCard from './CarCard';
import '../../css/Cars.css';

const Cars = ({carList, onFavClick}) => {
  const [currentCarIndex, updateCarIndex] = useState(0);
  const [carsCarList, updateCarsCarlist] = useState(carList);

  useEffect(() => {
    // cases were user removes a car at the last index. This forces a re-render
    if (carsCarList.length <= currentCarIndex) {
      updateCarIndex(currentCarIndex - 1);
    }
  }, [carsCarList, currentCarIndex]);

  const onCarouselSlide = index => updateCarIndex(index);

  const renderCarCard = carsCarList.map((car, index) => (
    <Carousel.Item className='border' key={car.car.id}>
      <CarCard carsCarList={carsCarList} updateCarsCarlist={updateCarsCarlist} car={car.car} index={index} key={car.car.id} onFavClick={onFavClick} />
    </Carousel.Item> 
  ));

  const renderComponent = carsCarList.length === 0 
  ?
  <div className='text-center'>favourite list is currently empty</div>
  :
  <>
    <Carousel interval={null} indicators={false} activeIndex={currentCarIndex} className='p-3' onSelect={onCarouselSlide}>
      {renderCarCard}
    </Carousel>

    <div className='text-center m-3'>
      {currentCarIndex + 1} / {carsCarList && carsCarList.length}
    </div>
  </>

  return (
    <div className='cars-container'>
      {renderComponent}
    </div>
  );
}

export default Cars;
