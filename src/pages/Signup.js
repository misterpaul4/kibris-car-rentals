import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Authentication.css';
const Signup = () => {

  return (
    <div className='auth-container container-fluid text-center bg-img'>
      <div className='container rounded py-5 auth'>
        <h1>Create An Account</h1>
        <form>
          <input type='text' className='rounded-pill mt-4' placeholder='username' /><br></br>
          <input type='submit' value='Sign up' className='rounded-pill my-3 bg-red shadow' />
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