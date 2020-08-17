import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FinalResult = (props) => {
  try {
    const countViews = props.location.countViews.countViews;
    const countRecords = props.location.countRecords.countRecords;
    const countManual = props.location.countManual.countManual;
    const time = props.location.time.time;
    const urlArray = props.location.urlArray.urlArray;
    const length = urlArray.length;
    const Template = props.location.Template.Template;
    var download_file=false
    if (Template==="Liquid Telecom"){
	download_file=true
	}
    if (time) {
      var a = time;
      var b = new Date().toLocaleString();
      var milliseconds = new Date(b) - new Date(a);
      var seconds = milliseconds / 1000;
      var minutes = milliseconds / 60000;
    }
    if (minutes) {
      console.log(minutes);
      console.log(milliseconds);
    }
    return (
      <Fragment>
        <div className='background-read'>
          <Navbar />
          <div className='box-read'>
            <h1 className='text-dark'>
              <u>Final Result</u>
            </h1>
            <h5>
              Total Views identified:
              <h6 className='text-success'>
                {countViews ? countViews : 'No view Available'}
              </h6>
            </h5>
            <br />
            <h5>
              No of Files Processed:
              <h6 className='text-success'> {length ? length : ''}</h6>
            </h5>
            <br />
            <h5>
              No of Records:
              <h6 className='text-success'>
                {countRecords ? countRecords : ''}
              </h6>
            </h5>
            <br />
            <h5>
              Manual corrected Records:
              <h6 className='text-success'>{countManual ? countManual : ''}</h6>
            </h5>
            <br />
            <h5>
              Time:
              <h6 className='text-success'>
                {length > 100 ? minutes : seconds}sec/min
              </h6>
            </h5>
            <div className>
              {download_file && <a
                href="http://localhost:5000/drawing_result.csv"
                download
                className='btn btn-primary'
              >
                Click to download Your File
              </a>}
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
              <Link to='/read' className='btn btn-primary btn-lg'>
                Back
              </Link>
            </div>
          </center>
        </div>
      </h1>
    );
  }
};

export default FinalResult;
