import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Group37 from '../Group37.png';

const Login = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [displayImages, setDisplayImages] = useState(null);

  const { username, password } = formData;

  const onChange_fun = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    var body = new FormData();
    body.set('username', username);
    body.set('password', password);
    //if data is req in json
    // body = JSON.stringify(body);
    Axios({
      method: 'post',
      url: 'http://localhost:5000/authenticate',
      data: body,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        setDisplayImages(response.data.files);
        if (displayImages)
          history.push({ pathname: '/hero', displayImages: { displayImages } });
      })
      .catch(function (response) {
        console.log('error');

        setError(true);
      });
  };
  console.log(displayImages);
  return (
    <>
      <div className='background-login'>
        <div className='row'>
          <div className='column'>
            <div className='box-login'>
              <h3>Login to your account</h3>
              <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                  <input
                    type='username'
                    className='input-login'
                    placeholder='User Name'
                    name='username'
                    value={username}
                    onChange={(e) => onChange_fun(e)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='input-login'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange_fun(e)}
                    minLength='6'
                  />
                </div>

                <input
                  type='submit'
                  className='btn btn-warning btn-lg'
                  value='LOGIN'
                />
              </form>

              {error ? <h5 class='text-danger'>Invalid credentials</h5> : ''}
            </div>
          </div>

          <div className='column'>
            <img src={Group37} className='img-login' alt='loginImg' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
