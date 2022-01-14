import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions'
import '../css/Authentication.css';
import { HOST } from '../utils/var';
const Signup = ({
  loginUser,
}) => {

  const [userUsername, updateUsername] = useState('');
  const [userPassword, updatePassword] = useState('');
  const [userRole, updateRole] = useState('user');

  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: userUsername,
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
          loginUser(data.token);
          console.log('signup successful'); // alert successfull
          history.push("/");
        })
      } else {
        console.log('Looks like there was a problem'); // alert
      }
    }).catch(function(error) {
      console.log('Looks like there was a problem: ', error); // alert
    });
  };

  return (
    <div className='auth-container container-fluid text-center bg-img'>
      <div className='container rounded py-5 auth'>
        <h1>Create An Account</h1>
        <form>
          <input type='text' className='rounded-pill mt-4 authInput' value={userUsername} onChange={(e) => updateUsername(e.target.value)} placeholder='username' /><br></br>
          <input type='password' className='rounded-pill mt-4 authInput' value={userPassword} onChange={(e) => updatePassword(e.target.value)} placeholder='password' /><br></br>
          
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


          <input type='submit' onClick={handleSubmit} value='Sign up' className='rounded-pill my-3 bg-red shadow' />
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
});

export default connect(null, mapDispatchToProps)(Signup);
