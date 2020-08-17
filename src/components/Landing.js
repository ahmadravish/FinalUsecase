import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../pages/Login';

function Landing() {
  return (
    <div className='background-landing'>
      <div className='hero'>
        <h1>Welcome</h1>

        <div className='single-btn'>
          <Link to='/login' className='btn btn-info btn-lg'>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
