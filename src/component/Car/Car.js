import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { showAlert, showModal } from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header';
import getSymbolFromCurrency from 'currency-symbol-map';
import { moneyWithCommas } from '../../utils/util';
import { HOST } from '../../utils/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import FavIcon from '../FavIcon';
import '../../css/Cars.css';

const Car = ({
  authToken: auth,
  alartUser,
  showLoginModal
}) => {

  const [currentCar, updateCurrentCar] = useState(null);
  const [localCurrency, updateCurrency] = useState(null);
  const [actionBtnPresets, updatePresets] = useState({
    actionBtnColor: '',
    actionBtnText: '',
    disableBtn: true,
  });
  const [favourited, updateFavourited] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    console.log("component mounted");
    const carConfig = auth.loggedIn
    ? {
      url: `${HOST}/cars/${id}/fav`,
      updateState: data => {
        updateCurrency(getSymbolFromCurrency(data.car.currency));
        updateFavourited(data.favourited);
        updateCurrentCar(data.car);
      },
      car: data => data.car,
      waitingList: data => data.waiting_list,
    }
    : {
      url: `${HOST}/cars/${id}`,
      updateState: data => {
        updateCurrency(getSymbolFromCurrency(data.currency));
        updateCurrentCar(data);
      },
      car: data => data,
      waitingList: () => false,
    }
    const fetchData = () => {
      fetch(carConfig.url, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: auth.token
        }
      }).then(response => {
        if (response.status.toString() === '200') {
          response.json().then(data => {
          const car = carConfig.car(data);
          const isWaiting = carConfig.waitingList(data);
          const presets = car.availability === "false"
          ? {
            actionBtnColor: 'rent-btn-container text-center p-2 mt-2 align-self-center bg-red',
            actionBtnText: 'rented',
            disableBtn: true,
          }
          : () => isWaiting
            ? {
              actionBtnColor: 'bg-warning rent-btn-container text-center p-2 mt-2 align-self-center',
              actionBtnText: 'pending approval',
              disableBtn: true,
            }
            : {
              actionBtnColor: 'rent-btn-container text-center p-2 mt-2 align-self-center bg-green',
              actionBtnText: 'apply to rent',
              disableBtn: false,
            }
            updatePresets(presets);

            carConfig.updateState(data);
          })
        }
        else if (response.status.toString() === '401') {showLoginModal()}
        else {
          alartUser({message: 'Looks like there was a problem. Please try again', positiveOutcome: false})
        }
      }).catch(function(error) {
        alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false})
      });
    }

    fetchData();

  }, [alartUser, id, auth.username, auth.loggedIn, auth.token, showLoginModal]);

  const getDate = dt => {
    const months = ["jan","feb","march","april","may","june","july","august","september","october","november","december"];
    const dateObj = new Date(dt);
    const day = dateObj.getDate().toString();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear().toString();

    return (day + '-' + months[month] + '-' + year);
  }

  const actionBtn = async () => {
    const credentials = {
      car_id: id
    }

    if (auth.loggedIn) {
      await fetch(`${HOST}/waiting_lists/`, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: auth.token,
        },
        body: JSON.stringify(credentials),
      }).then(response => {
        if (response.status.toString() === '201') {
          response.json().then(data => {
            alartUser({message: 'application sent successfully', positiveOutcome: true});
            window.location.reload(false);
          })
        } 
        else {
          response.json().then(data => {
            alartUser({message: data.errors, positiveOutcome: false})
          })
        }
      }).catch(function(error) {
        alartUser({message: 'Looks like there was a problem', positiveOutcome: false})
      });
    } else {
      // display login modal
      showLoginModal();
      
    }
  }

  return (
    <div className='car-page-container d-flex flex-column justify-content-between'>
      {
        currentCar
        ?
        <>
          <div className='car-page--child-container'>
            <Header heading={currentCar.rental_company} />
            <div className='d-flex flex-column align-items-center car-page'>
              {/* car image */}
              <div className='car-img bg-img' style={{backgroundImage: `url(${currentCar.image_url})`}}>
                <div className='bg-float d-flex justify-content-between align-items-center p-3 w-100'>
                  {/* avatar & company */}
                  <div>
                    <div>
                      <div>{currentCar.rental_company}</div>
                    </div>

                    <div className='mt-4'>
                      <FavIcon car={currentCar} favourited={favourited} />
                    </div>
                  </div>

                  {/* rental price */}
                  <div className='lh-sm'>
                    <span className='fw-bold fs-3'> {localCurrency} {parseInt(moneyWithCommas(currentCar.daily_rental_price))}</span><br></br>
                    <em>per day</em>
                  </div>
                </div>
              </div>

              <div className='mt-4 container car-details'>
                <p className='upload-date mb-3'><FontAwesomeIcon icon={faCalendar} /> {getDate(currentCar.created_at)}
                </p>
                <h2>About this rental</h2>
                <ul>
                  <li>Rental Company: <strong>{currentCar.rental_company}</strong></li>
                  <li>Manufacturer: <strong>{currentCar.manufacturer}</strong></li>
                  <li>Model: <strong>{currentCar.model}, {currentCar.model_year} model</strong></li>
                  <li>Delivery: <strong>{currentCar.delivery === 'true' ? 'yes' : 'no'}</strong></li>
                  <li>Fuel type: <strong>{currentCar.fuel_type ? currentCar.fuel_type : 'N/A'}</strong></li>
                  <li>Vin number: <strong>{currentCar.car_vin ? currentCar.car_vin : 'N/A'}</strong></li>
                </ul>

                <h2>Pricing</h2>
                <ul>
                  <li>Daily rental price: <strong>{localCurrency}{parseInt(moneyWithCommas(currentCar.daily_rental_price))}</strong></li>
                  <li>3 days rental price: <strong>{localCurrency}{parseInt(moneyWithCommas(currentCar.three_day_rental_price))}</strong></li>
                  <li>1 week rental price: <strong>{localCurrency}{parseInt(moneyWithCommas(currentCar.one_week_rental_price))}</strong></li>
                  <li>Monthly rental price: <strong>{localCurrency}{parseInt(moneyWithCommas(currentCar.one_month_rental_price))}</strong></li>
                </ul>
                {
                  currentCar.terms_and_conditions ?
                  <><h2>Terms & conditions</h2>
                  <p>{currentCar.terms_and_conditions}</p>
                  </> :
                  null
                }

                {
                  currentCar.rental_requirements ?
                  <><h2>Rental requirements</h2>
                  <p>{currentCar.rental_requirements}</p>
                  </> :
                  null
                }
              </div>
            </div>
          </div>

          <button disabled={actionBtnPresets.disableBtn} onClick={actionBtn} className={actionBtnPresets.actionBtnColor}>
            {actionBtnPresets.actionBtnText}
          </button>
        </>
        :
        <p className='text-center mt-5'>...loading</p>
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
  },
  showLoginModal: () => {
    dispatch(showModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Car);
