import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';
import { HOST } from '../utils/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {validatUsername, validatePassword} from '../utils/validate';

import '../css/Authentication.css';
const LogIn = ({
  loginUser,
}) => {
  const [userUsername, updateUsername] = useState('');
  const [userPassword, updatePassword] = useState('');
  const [usernameValidation, updateUsernameValidation] = useState({
    valid: true,
    message: ''
  });

  const [passwordValidation, updatePasswordValidation] = useState({
    valid: true,
    message: ''
  })

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userNameValidationObj = validatUsername(userUsername);
    const passWordValidationObj = validatePassword(userPassword);

    updateUsernameValidation(userNameValidationObj);
    updatePasswordValidation(passWordValidationObj);

    if (userNameValidationObj.valid && passWordValidationObj.valid) {
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
        console.log(response);
        if (response.status.toString() === '200') {
          response.json().then(data => {
            loginUser(data.token);
            console.log('login successful'); // alert
            history.push("/");
          })
        } else {
          console.log(response.statusText); // alert
        }
      }).catch(function(error) {
        console.log('Looks like there was a problem: ', error); // alert
      });
    }
  };

  return (
    <div className='auth-container container-fluid text-center bg-img'>
      <div className='rounded py-5 auth'>
        <h1>Log In</h1>
        <p>Hello there, log in and start renting cars <span>&#128515;</span></p>
        <form>
          <input type='text' className='rounded mt-2 authInput' value={userUsername} onChange={(e) => updateUsername(e.target.value)} placeholder='username' /><br></br>
          <span className={usernameValidation.valid ? 'd-none' : 'validation-message'}><FontAwesomeIcon icon={faExclamationCircle} /> {usernameValidation.message}</span><br></br>
          <input type='password' className='rounded mt-2 authInput' value={userPassword} onChange={(e) => updatePassword(e.target.value)} placeholder='password' /><br></br>
          <span className={passwordValidation.valid ? 'd-none' : 'validation-message'}><FontAwesomeIcon icon={faExclamationCircle} /> {passwordValidation.message}</span><br></br>
          <input type='submit' onClick={handleSubmit} value='Log In' className='rounded my-3 bg-red shadow' />
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
