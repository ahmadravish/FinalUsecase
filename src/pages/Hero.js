import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Group44 from '../img/Group44.png';
import Search44 from '../img/Search44.png';

const Hero = () => {
  try {
    return (
      <div className='background-login'>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/read'>
            <div className='box-fa2'>
              <img src={Group44} alt='#' />

              <h5 style={{ marginTop: '10%' }}>Upload Drawing</h5>
            </div>
          </Link>
          <Link to='/search'>
            <div className='box-fa3'>
              <img src={Search44} alt='#' />

              <h5 style={{ marginTop: '10%' }}>Search Drawing</h5>
            </div>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <>
        <Navbar />

        <h1 style={{ marginLeft: '10%', marginTop: '5%' }}>
          {' '}
          Cognitive Engineering Data Extractor
        </h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/read'>
            <div
              className='box-fa2'
              style={{
                marginLeft: '30%',
                marginTop: '15%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '15%',
              }}
            >
              <i
                class='fa fa-files-o'
                aria-hidden='true'
                style={{ fontSize: '50px' }}
              ></i>

              <br />
              <br />
              <h5 style={{ marginTop: '10%' }}>Upload Drawing</h5>
            </div>
          </Link>
          <Link to='/search'>
            <div
              className='box-fa2'
              style={{
                marginLeft: '55%',
                marginTop: '15%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '15%',
              }}
            >
              <i
                class='fa fa-search-plus'
                aria-hidden='true'
                style={{ fontSize: '50px' }}
              ></i>
              <br />
              <br />
              <h5 style={{ marginTop: '10%' }}>Search Drawing</h5>
            </div>
          </Link>
        </div>
      </>
    );
  }
};
export default Hero;
