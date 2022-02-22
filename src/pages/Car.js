import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { showAlert } from '../actions';
import { connect } from 'react-redux';
import Header from '../component/Header';
import getSymbolFromCurrency from 'currency-symbol-map';
import avatar from '../img/avatar.png';
import { moneyWithCommas } from '../utils/util';
import { HOST } from '../utils/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import '../css/Cars.css';

const Car = ({
  authToken: auth,
  alartUser
}) => {

  const [currentCar, updateCurrentCar] = useState(null);
  const [localCurrency, updateCurrency] = useState(null);
  const [isWaiting, updateWaitingList] = useState(false);
  const [actionBtnPresets, updatePresets] = useState({
    actionBtnColor: '',
    actionBtnText: '',
    disableBtn: true,
    update: false,
  })


  let { id } = useParams();

  useEffect(() => {
    const url = `${HOST}/cars/${id}`;

    const tempUser = {id: 2, username: "favour", password_digest: "$2a$12$w5.E/SGfF7y8OsQzo80PG.SKBA9uvsGDo6cHbTYyivyT.Yssjzd5K", company_name: null, role: "user"}
  
    fetch(url).then(response => {
      if (response.status.toString() === '200') {
        response.json().then(data => {
          updateCurrentCar(data);
          updateCurrency(getSymbolFromCurrency(data.currency));

          if (data.availability === 'false') {
            updatePresets({
              actionBtnColor: 'rent-btn-container text-center p-2 mt-2 align-self-center bg-red',
              actionBtnText: 'rented',
              disableBtn: true,
              update: true
            })
          } else {
          // check if user in waiting list
            data.waiting_lists.every(user => {
              if (user.applicant.username === tempUser.username) {
                updateWaitingList(true);
                return false;
              }
            })

            if (isWaiting) {
              updatePresets({
                actionBtnColor: 'bg-warning rent-btn-container text-center p-2 mt-2 align-self-center',
                actionBtnText: 'pending approval',
                disableBtn: true,
                update: true
              })
            } else {
              updatePresets({
                actionBtnColor: 'rent-btn-container text-center p-2 mt-2 align-self-center bg-green',
                actionBtnText: 'apply to rent',
                disableBtn: false,
                update: true
              })
            }
          }
        })
      } 
      else {
        alartUser({message: 'Looks like there was a problem. Please try again', positiveOutcome: false})
      }
    }).catch(function(error) {
      alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false})
    });
  
  }, [isWaiting, alartUser, id]);


  const getDate = dt => {
    const months = ["jan","feb","march","april","may","june","july","august","september","october","november","december"];
    const dateObj = new Date(dt);
    const day = dateObj.getDate().toString();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear().toString();

    return (day + '-' + months[month] + '-' + year);
  }

  const actionBtn = async () => {
    // console.log('my token ', auth.loggedIn);
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
            alartUser({message: 'application sent successfully', positiveOutcome: true})
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
      alartUser({message: 'Not logged in', positiveOutcome: false})
    }
  }

  return (
    <div className='car-page-container d-flex flex-column justify-content-between'>
      {
        actionBtnPresets.update ?
        <>
      <div className='car-page--child-container'>
        <Header heading={currentCar.rental_company} />
        <div className='d-flex flex-column align-items-center car-page'>
          {/* car image */}
          <div className='car-img bg-img' style={{backgroundImage: `url(${currentCar.image_url})`}}>
            <div className='bg-float d-flex justify-content-between align-items-center p-3 w-100'>
              {/* avatar & company */}
              <div>
                <img src={avatar} alt='rental company avatar' className='rental-company-AV'></img>
                <span>{currentCar.rental_company}</span>
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
              <li>Manufacturer: <strong>{currentCar.manufacturer}</strong></li>
              <li>Model: <strong>{currentCar.model}, {currentCar.model_year} model</strong></li>
              <li>Delivery: <strong>{currentCar.delivery === 'true' ? 'yes' : 'no'}</strong></li>
              <li>Fuel type: <strong>{currentCar.fuel_type ? currentCar.fuel_type : 'N/A'}</strong></li>
              <li>Vin number: <strong>{currentCar.car_vin ? currentCar.car_vin : 'N/A'}</strong></li>
            </ul>

            <h2>Pricing</h2>
            <ul>
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

        : <p className='text-center mt-5'>...loading</p>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Car);
