import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Authentication.css';
const LogIn = () => {

  return (
    <div className='auth-container container-fluid text-center bg-img'>
      <div className='container rounded py-5 auth'>
        <h1>Log In</h1>
        <p>Hello there, log in and start renting cars <span>&#128515;</span></p>
        <form>
          <input type='text' className='rounded-pill mt-4 authInput' placeholder='username' /><br></br>
          <input type='submit' value='Log In' className='rounded-pill my-3 bg-red shadow' />
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

export default LogIn;
