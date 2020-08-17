import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import pdf from '../pdf.png';

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
      urlArray.push(URL.createObjectURL(fileObj[0][i]));
    }
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
      urlArray.push(URL.createObjectURL(fileObj[0][i]));
    }
  };

  const uploadFiles = (e) => {
    e.preventDefault();
    setTime(new Date().toLocaleString());
    localStorage.setItem('Time', JSON.stringify(new Date().toLocaleString()));
    if (Template === null || !fileObj) {
      setError(true);
    } else {
      setUploading(true);
      setError(false);
      var myArray = [];

      for (var i = 0; i < fileObj[0].length; i++) {
        myArray.push(fileObj[0][i]);
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
            <i
              class='fa fa-files-o'
              aria-hidden='true'
              style={{ fontSize: '50px', padding: '10px' }}
            ></i>
            <h3> Add Image</h3>
          </div>

          {Template === 'Liquid Telecom' ? (
            <form className='section'>
              <div className='cocktails-center'>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px dashed black',
                    padding: '50px',
                  }}
                >
                  <i
                    class='fa fa-upload'
                    aria-hidden='true'
                    style={{ fontSize: '50px' }}
                  ></i>
                  <span>Upload Pdf</span>
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
                    border: '2px dashed black',
                    padding: '50px',
                  }}
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
                >
                  <i
                    class='fa fa-upload'
                    aria-hidden='true'
                    style={{ fontSize: '15px' }}
                  ></i>
                  <span>Upload Your Image</span>
                </div>
              </div>
            </form>
          )}

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

          <br />

          <form onSubmit={uploadFiles}>
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
            {uploadStatus ? (
              ''
            ) : (
              <button
                type='submit'
                // disabled={status}
                className='btn btn-warning'
                // onClick={handledisable}
              >
                Upload
              </button>
            )}
          </form>

          <br />

          {uploadStatus ? (
            Template == 'Liquid Telecom' ? (
              <div>
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
                  Proceed
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to={{
                    pathname: '/setview',
                    Template: { Template },
                    fileObj: { fileObj },
                    path: { path },
                    urlArray: { urlArray },
                    time: { time },
                  }}
                  className='btn btn-warning'
                >
                  Proceed
                </Link>
              </div>
            )
          ) : (
            ''
          )}

          <br />
          {error ? <h5 className='text-danger'>Please Select Template</h5> : ''}
        </div>
        {uploadStatus ? (
          <div className='col-sm-4'>
            <div className='box-read-gallery'>
              {Template === 'Liquid Telecom' ? (
                <form className='section'>
                  <div className='cocktails-center'>
                    {uploadStatus ? (
                      <article className='cocktail'>
                        <img src={pdf} alt='#' />
                      </article>
                    ) : (
                      ''
                    )}
                  </div>
                </form>
              ) : (
                <form className='section'>
                  <div className='cocktails-center'>
                    {uploadStatus
                      ? (urlArray || []).map((url) => (
                          <article className='cocktail'>
                            <div className='img-container'>
                              <img src={url} alt='#' />
                            </div>
                          </article>
                        ))
                      : ''}
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </Fragment>
  );
};

export default Read;
