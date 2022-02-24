import '../css/App.css';
import Header from '../component/Header';
import Filter from '../component/Filter';
import Cars from '../component/Cars';

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
]

function App() {
  return (
    <div className="App">
      <Header heading={'Favourites'} />
      <Filter />
      <div className='d-flex justify-content-center'>
        <Cars carsArr={dummyCars} />
      </div>
    </div>
  );
}

export default App;
