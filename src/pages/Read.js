import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import pdf from '../pdf.png';
import Group44 from '../img/Group44.png';
import upload from '../img/upload.png';

const Read = () => {
  const [fileObj] = useState([]);
  const [urlArray] = useState([]);
  const [path, Setpath] = useState(null);
  const [Template, setTemplate] = useState(null);

  const [status, setstatus] = useState(false);
  const [time, setTime] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, updateUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [error, setError] = useState(false);

  const uploadMultipleFiles = (e) => {
    fileObj.push(e.target.files);
    console.log(fileObj);
    for (let i = 0; i < fileObj[0].length; i++) {
      if (urlArray.indexOf(URL.createObjectURL(fileObj[0][i])) == -1)
        urlArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    uploadFiles();
  };

  const uploadPdfFiles = (e) => {
    //setFileObj([]);
    fileObj.push(e.target.files);
    console.log(fileObj[0]);
  };
  const handledisable = () => {
    // console.log(e.target.value);
    setstatus(true);
  };
  const handleTemplate = (e) => {
    // console.log(e.target.value);
    setTemplate(e.target.value);
    localStorage.setItem('Template', JSON.stringify(e.target.value));
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    fileObj.push(e.dataTransfer.files);
    console.log(fileObj);
    for (let i = 0; i < fileObj[0].length; i++) {
      if (urlArray.indexOf(URL.createObjectURL(fileObj[0][i])) == -1)
        urlArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    uploadFiles();
  };

  const uploadFiles = (e) => {
    // e.preventDefault();
    setTime(new Date().toLocaleString());
    localStorage.setItem('Time', JSON.stringify(new Date().toLocaleString()));
    if (Template === null || !fileObj) {
      setError(true);
    } else {
      setUploading(true);
      setError(false);
      var myArray = [];

      for (var i = 0; i < fileObj[0].length; i++) {
        if (myArray.indexOf(fileObj[0][i]) == -1) myArray.push(fileObj[0][i]);
      }
      console.log(Template);
      //const body = myArray;
      var body = new FormData();
      for (var j = 0; j < fileObj[0].length; j++)
        body.append('file', fileObj[0][j]);
      body.set('template', Template);

      /* for (var [key, value] of body.entries()) {
        console.log(key, value);
      }*/

      //console.log(body);
      axios({
        method: 'post',
        url: 'http://localhost:5000/upload_image',
        data: body,
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-token': '11111111111111111111111111111111',
        },

        onUploadProgress: (ev) => {
          const progress = (ev.loaded / ev.total) * 100;
          updateUploadProgress(Math.round(progress));
        },
      })
        .then((resp) => {
          var result = Object.entries(resp.data);

          Setpath(result);

          setUploadStatus(true);
          setUploading(false);
          localStorage.setItem('path', JSON.stringify(result));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Fragment>
      <div className='background-login'>
        <Navbar />

        <div className='row'>
          <div className='box-read'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '-40px',
              }}
            >
              <img src={Group44} alt='#' style={{ width: '17%' }}></img>
              <h3> Add Image</h3>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div class='input-group sm-3'>
              <div class='col-xs-4'>
                <select
                  value={Template}
                  onChange={handleTemplate}
                  class='custom-select'
                  id='inputGroupSelect02'
                >
                  <option selected>select Template</option>
                  <option value='Table at Top '>Table at Top</option>
                  <option value='Table at Bottom'>Table at Bottom</option>
                  <option value='Liquid Telecom'>Telecom Drawing</option>
                  <option value='Others'>Others </option>
                </select>
              </div>
            </div>

            {Template === 'Liquid Telecom' ? (
              <form className='section'>
                <div className='cocktails-center'>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px dashed #707070',
                      padding: '10%',
                      borderRadius: '5%',
                    }}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                  >
                    <ul style={{ marginLeft: '26%', alignItems: 'center' }}>
                      <li>
                        <img
                          src={upload}
                          style={{ width: '37%', marginLeft: '7%' }}
                          alt='#'
                        />
                      </li>
                      <br />
                      <li>
                        <h5
                          style={{
                            textAlign: 'center',
                            font: 'Regular 14px/19px Roboto',
                            letterSpacing: '0px',
                            marginLeft: '-55%',
                          }}
                        >
                          Upload your file
                        </h5>
                        <p style={{ marginLeft: '1%', marginTop: '-12%' }}>
                          .pdf
                        </p>
                      </li>
                      <br />

                      <li>
                        <p
                          style={{
                            textAlign: 'center',
                            font: 'Regular 14px/19px Roboto',
                            letterSpacing: '0px',
                            marginLeft: '-50%',
                          }}
                        >
                          You can Drag and drop here
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            ) : (
              <form className='section'>
                <div className='cocktails-center'>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px dashed #707070',
                      padding: '10%',
                      borderRadius: '5%',
                    }}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                  >
                    <ul style={{ marginLeft: '26%', alignItems: 'center' }}>
                      <li>
                        <img
                          src={upload}
                          style={{ width: '37%', marginLeft: '7%' }}
                          alt='#'
                        />
                      </li>
                      <br />
                      <li>
                        <h5
                          style={{
                            textAlign: 'center',
                            font: 'Regular 14px/19px Roboto',
                            letterSpacing: '0px',
                            marginLeft: '-55%',
                          }}
                        >
                          Upload your file
                        </h5>
                        <p style={{ marginLeft: '1%', marginTop: '-12%' }}>
                          .jpeg,.png,.tiff
                        </p>
                      </li>
                      <br />

                      <li>
                        <p
                          style={{
                            textAlign: 'center',
                            font: 'Regular 14px/19px Roboto',
                            letterSpacing: '0px',
                            marginLeft: '-50%',
                          }}
                        >
                          You can Drag and drop here
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            )}

            <form>
              {Template === 'Liquid Telecom' ? (
                <div class='input-group '>
                  <div className='col-xs-4'>
                    {uploadStatus ? (
                      ''
                    ) : uploading ? (
                      ' '
                    ) : (
                      <div class='custom-file '>
                        <input
                          type='file'
                          name='file'
                          className='custom-file-input'
                          id='inputGroupFile02'
                          onChange={uploadMultipleFiles}
                          accept='.pdf'
                          multiple
                        />
                        <label class='custom-file-label' for='inputGroupFile02'>
                          Choose file
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div class='input-group '>
                  <div className='col-xs-4'>
                    {uploadStatus ? (
                      ''
                    ) : uploading ? (
                      ' '
                    ) : (
                      <div class='custom-file '>
                        <input
                          type='file'
                          name='file'
                          className='custom-file-input'
                          id='inputGroupFile02'
                          onChange={uploadMultipleFiles}
                          accept='image/*'
                          multiple
                        />
                        <label class='custom-file-label' for='inputGroupFile02'>
                          Choose file
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <br />
              <br />
              {uploading ? (
                <div
                  className='progress-bar-container'
                  style={{ width: '25%', height: '10%' }}
                >
                  <CircularProgressbar
                    value={uploadProgress}
                    text={`${uploadProgress}% uploaded`}
                    styles={buildStyles({
                      textSize: '10px',
                      pathColor: 'teal',
                    })}
                  />
                </div>
              ) : null}
              <br />
            </form>

            {error ? (
              <h5 className='text-danger'>Please Select Template</h5>
            ) : (
              ''
            )}
          </div>
          {uploadStatus ? (
            <div className='col-sm-4'>
              <div className='box-read-gallery'>
                {Template === 'Liquid Telecom' ? (
                  <>
                    <h5 style={{ color: 'orange' }}>Pdf Uploaded Success</h5>
                    <div>
                      <Link
                        to='/pdftable'
                        className='btn btn-warning'
                        style={{
                          fontSize: 'x-small',
                          padding: '2.4%',
                          width: '20%',
                        }}
                      >
                        CONTINUE
                      </Link>
                    </div>
                  </>
                ) : (
                  <form className='section'>
                    <div className='grid'>
                      {uploadStatus
                        ? (urlArray || []).map((url) => (
                            <article className='cocktail'>
                              <div className='img-container'>
                                <img
                                  src={url}
                                  style={{
                                    border: '1px solid #BEBEBE',
                                    borderRadius: '2.5%',
                                  }}
                                  alt='#'
                                />
                              </div>
                            </article>
                          ))
                        : ''}
                    </div>
                    {uploadStatus ? (
                      Template == 'Liquid Telecom' ? (
                        ''
                      ) : (
                        <div>
                          <Link
                            to='/setview'
                            className='btn btn-warning'
                            style={{
                              fontSize: 'x-small',
                              padding: '2.4%',
                              width: '20%',
                            }}
                          >
                            CONTINUE
                          </Link>
                        </div>
                      )
                    ) : (
                      ''
                    )}
                  </form>
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Read;
