import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, showAlert, logout, hideModal } from '../../actions';
import { HOST } from '../../utils/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {validatUsername, validatePassword} from '../../utils/validate';
import '../../css/Authentication.css';

const LogIn = ({
  loginUser,
  alartUser,
  modalClass,
  logoutUser,
  reload,
  hideLoginModal,
  redirect
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
            loginUser({
              username: data.username,
              token: data.token,
              company: data.company_name
            });
            alartUser({message: 'login successful', positiveOutcome: true})
            if (redirect) {history.push("/");}
            if (reload) {window.location.reload(false);}
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

  const handleSkip = () => {
    logoutUser();
  }

  return (
    <div className={`container-fluid text-center bg-img ${modalClass}`}>
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
          <Link to={`/`} onClick={handleSkip}>Skip login</Link>
        </div>

        <div className='mt-5'>
          Don't have an account?
          <br></br>
          <Link onClick={() => hideLoginModal()} to={`/signup`}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

LogIn.defaultProps = {
  modalClass: "auth-page auth-container",
  reload: false,
  redirect: true
}

const mapDispatchToProps = dispatch => ({
  loginUser: status => {
    dispatch(login(status));
  },
  logoutUser: () => {
    dispatch(logout());
  },
  alartUser: status => {
    dispatch(showAlert(status));
  },
  hideLoginModal: () => {
    dispatch(hideModal());
  }
});

export default connect(null, mapDispatchToProps)(LogIn);
