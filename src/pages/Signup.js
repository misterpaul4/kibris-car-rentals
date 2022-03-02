import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, showAlert } from '../actions'
import '../css/Authentication.css';
import { HOST } from '../utils/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import {validatUsername, validatePassword} from '../utils/validate';

const Signup = ({
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
  const [userRole, updateRole] = useState('user');

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
        role: userRole,
      }

      await fetch(`${HOST}/signup`, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(credentials),
      }).then(response => {
        if (response.status.toString() === '201') {
          response.json().then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            loginUser({
              username: data.username,
              token: data.token
            });
            alartUser({message: 'signup successful', positiveOutcome: true});
            history.push("/");
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
    }
  };

  return (
    <div className='auth-container container-fluid text-center bg-img'>
      <div className='rounded py-5 auth'>
        <h1>Create An Account</h1>
        <form>
          <input type='text' className='rounded mt-2 authInput' value={userUsername.toLowerCase()} onChange={(e) => updateUsername(e.target.value)} placeholder='username' /><br></br>
          <span className={usernameValidation.valid ? 'd-none' : 'validation-message'}><FontAwesomeIcon icon={faExclamationCircle} /> {usernameValidation.message}</span><br></br>
          <input type='password' className='rounded mt-2 authInput' value={userPassword} onChange={(e) => updatePassword(e.target.value)} placeholder='password' /><br></br>
          <span className={passwordValidation.valid ? 'd-none' : 'validation-message'}><FontAwesomeIcon icon={faExclamationCircle} /> {passwordValidation.message}</span><br></br>
          <div className='mt-3'>
          <small><em>How do you intend to use this application?</em></small><br></br>
          <div>
            <input
              type="radio"
              value="user"
              className='m-2'
              checked={userRole === 'user'}
              onChange={e => updateRole(e.target.value)}
            />
            <label>I am renting</label>
          </div>
          <div>
            <input
              type="radio"
              value="admin"
              className='m-2'
              checked={userRole === 'admin'}
              onChange={e => updateRole(e.target.value)}
            />
            <label>I am a registered rental company</label>
          </div>
          </div>


          <input type='submit' onClick={handleSubmit} value='Sign up' className='rounded my-3 bg-red shadow' />
        </form>

        <div className='mt-5'>
          Already have an account?
          <br></br>
          <Link to={`/login`}>Log in</Link>
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

export default connect(null, mapDispatchToProps)(Signup);
