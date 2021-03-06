import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, showAlert } from '../../actions'
import { HOST } from '../../utils/var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import {validatUsername, validatePassword, validateNonEmpty} from '../../utils/validate';
import '../../css/Authentication.css';

const Signup = ({
  loginUser,
  alartUser
}) => {
  const validationDefault = {
    valid: true,
    message:'',
  }

  const [userUsername, updateUsername] = useState('');
  const [userPassword, updatePassword] = useState('');

  const [company, updateCompanyName] = useState('');

  const [usernameValidation, updateUsernameValidation] = useState(validationDefault);
  const [passwordValidation, updatePasswordValidation] = useState(validationDefault)
  const [companyNameValidation, updateCompanyNameValidation] = useState(validationDefault)
  const [userRole, updateRole] = useState('user');

  const history = useHistory();


  const userRoleSelected = userRole === 'admin' ? {
    companyField:
    <>
      <input type='text' className='rounded mt-2 authInput' value={company} onChange={(e) => updateCompanyName(e.target.value)} placeholder='company name' /><br></br>

      <span className={companyNameValidation.valid ? 'd-none' : 'validation-message'}><FontAwesomeIcon icon={faExclamationCircle} /> {companyNameValidation.message}</span><br></br>
    </>,
    compValidation: () => {
      const validatedCompanyName = validateNonEmpty(company);
      updateCompanyNameValidation(validatedCompanyName);
    }
  } :
  {
    companyField: null,
    compValidation: () => null
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatedUsername = validatUsername(userUsername);
    const validatedPassword = validatePassword(userPassword);

    updateUsernameValidation(validatedUsername);
    updatePasswordValidation(validatedPassword);

    userRoleSelected.compValidation();


    if (validatedUsername.valid && validatedPassword.valid) {
      const credentials = {
        username: userUsername.toLowerCase(),
        password: userPassword,
        role: userRole,
        company_name: company,
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
            loginUser({
              username: data.username,
              token: data.token,
              company: data.company_name
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
    <div className='auth-container auth-page container-fluid text-center bg-img'>
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

          {userRoleSelected.companyField}
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
