import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import { HOST } from '../../utils/var';
import { showAlert, showModal } from '../../actions';
import '../../css/Dashboard.css';

const Dashboard = ({
  authUser: auth,
  showLoginModal,
  alartUser
}) => {

  const [cars, updateCars] = useState([]);

  useEffect(() => {    
    const getData = () => {
      fetch(`${HOST}/users/${auth.username}/cars_uploaded`,{
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
            updateCars(data);
          })
        } else if (response.status.toString() === '401') {
          showLoginModal();
        }
        else {
          alartUser({message: 'there seems to be a problem', positiveOutcome: false});
        }
      }).catch(function(error) {
        alartUser({message: 'Looks like there was a problem. Please check your connection and try again.', positiveOutcome: false});
      });
    }
  
    getData();
  }, [auth.username, auth.token, alartUser, showLoginModal]);

  const renderCars = cars.map((car, index) => {
  const preset = car.availability === 'true' ?
  {requests: car.waiting_lists.length,
    class: ''
  } :
  {requests: 'rented',
  class: 'text-danger'
}
  
  return (<tr key={car.id} className='mt-2'>
      <th scope="row">{index + 1}</th>
      <td><img className='dashboard-img-1' alt={car.model} src={car.image_url}></img></td>
      <td>
        {car.manufacturer} <br></br>
        {car.model_year}, {car.model}
      </td>
      <td className={preset.class}>
        {preset.requests}
      </td>
    </tr>)})

  return (
    <div>
      <Header heading={auth.company} />
      <h1 className='text-center'>Requests</h1>
      <div className='container'>
        {cars ? 
          <table className='table text-center dashboard-table'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">car</th>
                <th scope="col">details</th>
                <th scope="col"><span className='underlined'>no</span> of requests</th>
              </tr>
            </thead>
            <tbody>
              {renderCars}
            </tbody>
          </table> : null
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  authUser: state.auth
});

const mapDispatchToProps = dispatch => ({
  alartUser: status => {
    dispatch(showAlert(status));
  },
  showLoginModal: () => {
    dispatch(showModal());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
