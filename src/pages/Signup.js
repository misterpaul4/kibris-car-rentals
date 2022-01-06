import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Authentication.css';
import { HOST } from '../utils/var';
const Signup = () => {

  const [userUsername, updateUsername] = useState('');
  const [userPassword, updatePassword] = useState('');
  const [userRole, updateRole] = useState('user');

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
    }).then(response => response.json())
    .then(data => {
      // successful
      console.log('data sent', data);
    }).catch(function(error) {
      // unsuccessful
      console.log('Looks like there was a problem: ', error);
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
          <input
            type="radio"
            value="user"
            className='m-2'
            checked={userRole === 'user'}
            onChange={e => updateRole(e.target.value)}
          />
          <label>I am renting</label>

          <input
            type="radio"
            value="admin"
            className='m-2'
            checked={userRole === 'admin'}
            onChange={e => updateRole(e.target.value)}
          />
          <label>I am a registered rental company</label>
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

export default Signup;