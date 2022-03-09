import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, showAlert } from '../../actions';
import { HOST } from '../../utils/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {validatUsername, validatePassword} from '../../utils/validate';
import '../../css/Authentication.css';

const LogIn = ({
  loginUser,
  alartUser
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

    const validatedUsername = validatUsername(userUsername);
    const validatedPassword = validatePassword(userPassword);

    updateUsernameValidation(validatedUsername);
    updatePasswordValidation(validatedPassword);

    if (validatedUsername.valid && validatedPassword.valid) {
      const credentials = {
        username: userUsername.toLowerCase(),
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
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            loginUser({
              username: data.username,
              token: data.token
            });
            alartUser({message: 'login successful', positiveOutcome: true})
            history.push("/");
          })
        } 
        else {
          response.json().then(data => {
            alartUser({message: data.errors + '. please try again', positiveOutcome: false})
          })
        }
      }).catch(function(error) {
        alartUser({message: 'Looks like there was a problem', positiveOutcome: false})
      });
    }
  };

  return (
    <div className='auth-container container-fluid text-center bg-img'>
      <div className='rounded py-5 auth'>
        <h1>Log In</h1>
        <p>Hello there, log in and start renting cars <span>&#128515;</span></p>
        <form>
          <input type='text' className='rounded mt-2 authInput' value={userUsername.toLowerCase()} onChange={(e) => updateUsername(e.target.value)} placeholder='username' /><br></br>
          <span className={usernameValidation.valid ? 'd-none' : 'validation-message'}><FontAwesomeIcon icon={faExclamationCircle} /> {usernameValidation.message}</span><br></br>
          <input type='password' className='rounded mt-2 authInput' value={userPassword} onChange={(e) => updatePassword(e.target.value)} placeholder='password' /><br></br>
          <span className={passwordValidation.valid ? 'd-none' : 'validation-message'}><FontAwesomeIcon icon={faExclamationCircle} /> {passwordValidation.message}</span><br></br>
          <input type='submit' onClick={handleSubmit} value='Log In' className='rounded my-3 bg-red shadow' />
        </form>

        <div>
          <Link to={`/`}>Skip login</Link>
        </div>

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
  alartUser: status => {
    dispatch(showAlert(status));
  }
});

export default connect(null, mapDispatchToProps)(LogIn);
