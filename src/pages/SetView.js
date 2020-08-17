import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import pdf from '../pdf.png';

//import ImageDetails from './ImageDetails';

function SetView(props) {
  const [View, setView] = useState(null);

  const [currentImage, setCurrentImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentPath, setCurrentPath] = useState(null);
  const [items] = useState([]);
  const [countViews, setCountViews] = useState(0);

  //var View = 'select View';

  try {
    const path = props.location.path.path;

    const fileObj = props.location.fileObj.fileObj;
    const urlArray = props.location.urlArray.urlArray;
    const Template = props.location.Template.Template;
    const time = props.location.time.time;

    //for (var i = 0; i < fileObj.length; i++)
    // console.log(fileObj[0][0]);
    // console.log(fileObj[0][1]);
    console.log(Template);

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
                                src={'http://localhost:5000/' + i[0]}
                                //src={i[0]}
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
                <Link
                  to={{
                    pathname: '/pdftable',
                    countViews: 0,
                    countRecords: 0,
                    countManual: 0,
                    fileObj: { fileObj },
                    path: { path },
                    urlArray: { urlArray },
                    Template: { Template },
                    time: { time },
                  }}
                  className='btn btn-warning btn-lg'
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
	<Fragment>
        <Navbar />
	<div style={{'margin-left': '7%'}}>
              <h1 className='cnt-img'>
        {path.length} File/s Loaded
      </h1>
 	<p className='cnt-img' style={{"color":"orange"}}>**Please select a file to start processing</p>
        <div class='row'>
          <div class='col-sm-4 '>
            <div>
              {path.map((img, key) => {
                return (
                  <div className='box-tableview-image'>
                    
                    <div className='form-group preview'>

                      <img
                        // src={img[0] || ''}
                        src={'http://localhost:5000/' + img[0] || ' '}
                        alt='input Image'
                      />
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
                  </div>
                );
              })}
            </div>
            <div>
              <div className='box-read-gallery'>
                {/*style={{ 'margin-left': '2%', width: '80%', height: '5%' }} */}

                <h1>
                  {' '}
                  Set View{' '}
 
		{items.length === path.length ? (
                    <div className='single-btn'>
                    <Link
                      to={{
                        pathname: '/tabledetails',
                        fileObj: { fileObj },
                        path: { path },
                        urlArray: { urlArray },
                        countViews: { countViews },
                        time: { time },

                        Template: { Template },
                      }}
                      className='btn btn-warning btn-lg'
                    >
                        Proceed
                      </Link>
                    </div>
                  ) : (
                    <h6>NOTE:Set all Images to proceed to next page</h6>
                  )}
                </h1>
                <h2>{currentPath ? currentPath[0] : ''}</h2>
                {success ? (
                  View === 'remove' ? (
                    <h5 class='text-success'>View Removed</h5>
                  ) : (
                    <h5 class='text-success'>{View} view set</h5>
                  )
                ) : (
                  ' '
                )}
                <div className='setview-center'>
                  {currentPath
                    ? re.map((i) => {
                        return (
                          <div className='form-group preview'>
                            <div className='setview-single'>
                              {currentPath ? (
                                <img
                                  src={'http://localhost:5000/' + i[0]}
                                  alt='#'
                                />
                                
                              ) : (
                                ' '
                              )}
                              <br/>
				
                              {path ? (
                                <form onSubmit={uploadView}>
                                  <div class='input-group sm-3'>
                                    <div class='col-xs-4'>
                                      <p style={{"color":"orange"}}>Predicted view: {i[1]}</p>
                                      <select
                                        value={i[1].View}
                                        onChange={(e) => {
                                          handleView(e);
                                          currentImagefun(i[0]);
                                        }}
                                        class='custom-select'
                                        id='inputGroupSelect02'
                                      >
                                        <option selected>select View</option>
                                        <option value='front'>Front</option>
                                        <option value='top'>Top</option>
                                        <option value='bottom'>Bottom</option>
                                        <option value='left'>Left</option>
                                        <option value='right'>Right</option>
                                        <option value='isometric'>
                                          Isometric
                                        </option>
                                        <option value='assembly'>
                                          Assembly
                                        </option>
                                        <option value='remove'>Remove</option>
                                      </select>
                                    </div>
                                  </div>
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
	</Fragment>
      </>
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
