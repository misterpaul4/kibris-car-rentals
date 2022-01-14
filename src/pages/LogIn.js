import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions'
import { HOST } from '../utils/var';

import '../css/Authentication.css';
const LogIn = ({
  loginUser,
}) => {
  const [userUsername, updateUsername] = useState('');
  const [userPassword, updatePassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username: userUsername,
      password: userPassword,
    }

    await fetch(`${HOST}/login`, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(response => {
      if (response.status.toString() === '200') {
        response.json().then(data => {
          loginUser(data.token);
          console.log('login successful'); // alert
          history.push("/");
        })
      } else {
        console.log('incorrect username or password'); // alert
      }
    }).catch(function(error) {
      console.log('Looks like there was a problem: ', error); // alert
    });
  };

  return (
    <div className='auth-container container-fluid text-center bg-img'>
      <div className='container rounded py-5 auth'>
        <h1>Log In</h1>
        <p>Hello there, log in and start renting cars <span>&#128515;</span></p>
        <form>
          <input type='text' className='rounded-pill mt-4 authInput' value={userUsername} onChange={(e) => updateUsername(e.target.value)} placeholder='username' /><br></br>
          <input type='password' className='rounded-pill mt-4 authInput' value={userPassword} onChange={(e) => updatePassword(e.target.value)} placeholder='password' /><br></br>
          <input type='submit' onClick={handleSubmit} value='Log In' className='rounded-pill my-3 bg-red shadow' />
        </form>

        <div className='mt-5'>
          Don't have an account?
          <br></br>
          <Link to={`/signup`}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  loginUser: status => {
    dispatch(login(status));
  },
});

export default connect(null, mapDispatchToProps)(LogIn);
