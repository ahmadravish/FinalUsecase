import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
const Register = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState(false);
  const { username, password, password2 } = formData;

  const onChange_fun = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      var body = new FormData();
      body.set('username', username);
      body.set('password', password);
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const res = await axios.post(
          'http://localhost:5000/create_account',
          body,
          config
        );

        console.log(res.data);
        history.push('/hero');
      } catch (error) {
        console.error(error.response.data);
        setError(true);
      }
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div >
        <Navbar/>
        <div className='box-read'>
          <h1  style={{ color: 'orange',}}>Add User</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create New Account
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='username'
                placeholder='username'
                name='username'
                value={username}
                onChange={(e) => onChange_fun(e)}
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange_fun(e)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange_fun(e)}
                minLength='6'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Create' style={{ background: 'orange',border:"none"}}/>
          </form>
          
          {error ? <h5 class='text-danger'>Password doesn't match</h5> : ''}
        </div>
      </div>
    </>
  );
};

export default Register;
