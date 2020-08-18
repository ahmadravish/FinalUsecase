import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import pdf from '../pdf.png';
import six from '../img/six.png';
//import ImageDetails from './ImageDetails';

function SetView() {
  const [View, setView] = useState(null);

  const [currentImage, setCurrentImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentPath, setCurrentPath] = useState(null);

  const [countViews, setCountViews] = useState(0);
  const [path, setPath] = useState(null);
  const [Template, setTemplate] = useState(null);
  const [time, setTime] = useState(null);
  const [items] = useState([]);

  React.useEffect(() => {
    let pt = JSON.parse(localStorage.getItem('path'));
    let tmp = JSON.parse(localStorage.getItem('Template'));
    let ti = JSON.parse(localStorage.getItem('Time'));
    if (pt != null && tmp !== null && ti !== null) {
      setPath(pt);
      setTemplate(tmp);
      setTime(ti);
    }
  }, []);

  try {
    //for (var i = 0; i < fileObj.length; i++)
    // console.log(fileObj[0][0]);
    // console.log(fileObj[0][1]);
    //console.log(Template);

    const handleView = (e) => {
      // console.log(e.target);
      // console.log(e.target.value);

      setView(e.target.value);
    };

    const currentImagefun = (img) => {
      setCurrentImage(img);
    };

    const imageSetCurrentPath = (key, item) => {
      setCurrentPath(key);
      //  console.log(currentPath);
      if (items.indexOf(item) === -1) items.push(item);
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const uploadView = (e) => {
      e.preventDefault();
      setCountViews(countViews + 1);
      // console.log(currentPath);
      console.log(View);
      console.log(currentImage);

      const body = new FormData();
      //add path acc to image and install npm i babel-preset-es2015
      body.set('Image', currentImage);
      body.set('view', View);

      /*for (var [key, value] of body.entries()) {
        console.log(key, value);
      }*/

      axios({
        method: 'post',
        data: body,
        url: 'http://localhost:5000/set_view',
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-token': '11111111111111111111111111111111',
        },
      })
        .then((resp) => {
          console.log('success set view');
          setSuccess(true);
          localStorage.setItem('countViews', JSON.stringify(countViews + 1));
          setTimeout(function () {
            setSuccess(false);
          }, 2000);
        })
        .catch((err) => console.error(err));
    };

    if (currentPath) {
      var re = Object.entries(currentPath);
      // console.log(re[0][0]);
    }

    if (Template === 'Liquid Telecom') {
      return (
        <div>
          <Navbar />
          <h1 className='cnt-img'>
            {path.length === 1 ? (
              <p>{path.length} Pdf Loaded</p>
            ) : (
              <p>{path.length} Pdfs Loaded</p>
            )}
          </h1>
          <div className='row'>
            <div
              class='col-sm-4'
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginTop: '30px',
                position: 'unset',
              }}
            >
              {path.map((img, key) => {
                return (
                  <div className='box-tableview-image'>
                    <div className='form-group preview'>
                      <img src={pdf || ' '} alt='input Image' />
                    </div>
                    <br />
                    <button
                      className='btn btn-warning'
                      onClick={() => {
                        imageSetCurrentPath(img[1], img[0]);
                      }}
                    >
                      select
                    </button>
                    <br />
                    <br />
                  </div>
                );
              })}
            </div>

            <div className='box-read-gallery'>
              <div className='setview-center'>
                {currentPath
                  ? re.map((i, key) => {
                      return (
                        <div className='form-group preview'>
                          <div className='setview-single'>
                            {currentPath ? (
                              <img
                                //src={'http://localhost:5000/' + i[0]}
                                src={i[0]}
                                alt='#'
                              />
                            ) : (
                              ' '
                            )}
                          </div>
                        </div>
                      );
                    })
                  : ' '}
              </div>

              <div className='single-btn'>
                <Link to='/pdftable' className='btn btn-warning btn-lg'>
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Fragment>
        <div className='background-login'>
          <Navbar />
          <div style={{ 'margin-left': '7%' }}>
            {/* <h1 className='cnt-img'>
              {path.length === 1 ? (
                <p>{path.length} Image Loaded</p>
              ) : (
                <p>{path.length} Images Loaded</p>
              )}
            </h1>*/}
            <p className='cnt-img' style={{ color: 'orange' }}>
              **Please select a file to start processing
            </p>
            <div class='row'>
              <div class='col-sm-4 '>
                <div className='box-tableview-image'>
                  {path.map((img, key) => {
                    return (
                      <div>
                        <div className='form-group preview'>
                          <div class='container'>
                            <img
                              src={img[0] || ''}
                              //src={'http://localhost:5000/' + img[0] || ' '}
                              alt='input Image'
                              className='image'
                              style={{
                                top: '10%',
                                left: '10%',
                                width: '100%',
                                height: '100%',
                                background: 'transparent',
                                borderRadius: '4%',
                                position: 'unset',
                              }}
                              onClick={() => {
                                imageSetCurrentPath(img[1], img[0]);
                              }}
                            />
                            <br />
                            {/* <div class='middle'>
                              <img
                                src={six}
                                alt='#'
                                onClick={() => {
                                  imageSetCurrentPath(img[1], img[0]);
                                }}
                              />
                              </div>*/}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div
                    style={{
                      marginLeft: '100%',
                      width: '200%',
                      marginTop: '-23%',
                    }}
                  >
                    {items.length === path.length ? (
                      <div className='single-btn'>
                        <Link
                          to='/tabledetails'
                          className='btn btn-warning '
                          style={{
                            padding: '5%',
                            fontSize: '1rem',
                            lineHeight: '0',
                            position: 'absolute',
                            background: '#ff8000',
                            color: '#ffffff',
                            width: '50%',
                            marginLeft: '110%',
                            fontSize: '80%',
                            marginTop: '20%',
                            borderRadius: '5%',
                          }}
                        >
                          CONFIRM AND PROCEED
                        </Link>
                      </div>
                    ) : (
                      <p
                        className='cnt-img'
                        style={{ color: 'orange', marginBottom: '-6%' }}
                      >
                        NOTE:Set all Images to proceed to next page
                      </p>
                    )}
                  </div>
                  <div className='setview-center'>
                    {/*style={{ 'margin-left': '2%', width: '80%', height: '5%' }} */}
                    <h1>Set View</h1>
                    {/* <h2>{currentPath ? currentPath[0] : ''}</h2>*/}
                    {success ? (
                      View === 'remove' ? (
                        <h5 class='text-success'>View Removed</h5>
                      ) : (
                        <h5 class='text-success'>{View} view set</h5>
                      )
                    ) : (
                      ' '
                    )}
                    <div>
                      {currentPath
                        ? re.map((i) => {
                            return (
                              <div className='form-group preview'>
                                <div className='setview-single'>
                                  {currentPath ? (
                                    <img
                                      //src={'http://localhost:5000/' + i[0]}
                                      src={i[0]}
                                      alt='#'
                                    />
                                  ) : (
                                    ' '
                                  )}
                                  <br />

                                  {path ? (
                                    <form onSubmit={uploadView}>
                                      <div class='input-group sm-3'>
                                        <div class='col-xs-4'>
                                          <p style={{ color: 'orange' }}>
                                            Predicted view: {i[1]}
                                          </p>
                                          <select
                                            value={i[1].View}
                                            onChange={(e) => {
                                              handleView(e);
                                              currentImagefun(i[0]);
                                            }}
                                            class='custom-select'
                                            id='inputGroupSelect02'
                                          >
                                            <option selected>
                                              select View
                                            </option>
                                            <option value='front'>Front</option>
                                            <option value='top'>Top</option>
                                            <option value='bottom'>
                                              Bottom
                                            </option>
                                            <option value='left'>Left</option>
                                            <option value='right'>Right</option>
                                            <option value='isometric'>
                                              Isometric
                                            </option>
                                            <option value='assembly'>
                                              Assembly
                                            </option>
                                            <option value='remove'>
                                              Remove
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      <br />
                                      <button
                                        className='btn btn-warning'
                                        style={{ position: 'relative' }}
                                      >
                                        Set View
                                      </button>
                                    </form>
                                  ) : (
                                    ' '
                                  )}
                                </div>
                              </div>
                            );
                          })
                        : ' '}
                    </div>

                    <br />
                    <br />
                    <br />
                    <center>
                      <button className='btn btn-warning' onClick={scrollToTop}>
                        Scroll Up
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } catch (error) {
    return (
      <h1>
        <br />
        <br />
        <div className='jumbotron'>
          <div className='section-title'>
            Please Go Back and Upload Image...
          </div>
          <center>
            <div className='single-btn'>
              <Link to='/read' className='btn btn-warning btn-lg'>
                Back
              </Link>
            </div>
          </center>
        </div>
      </h1>
    );
  }
}

export default SetView;
