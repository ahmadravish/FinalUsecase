import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import dwnld from '../img/dwnld.png';
import dwnld2 from '../img/dwnld2.png';

const ImageDetails = () => {
  const [imageData, setImageData] = useState(null);

  const [countViews, setCountViews] = useState(0);
  const [path, setPath] = useState(null);
  const [Template, setTemplate] = useState(null);
  const [time, setTime] = useState(null);

  const [countRecords, setCountRecords] = useState(0);
  const [countManual, setCountManual] = useState(0);
  const [download, setdownload] = useState(null);
  const [downloadPath, setDownloadPath] = useState(null);
  const [d_path, setd_path] = useState(null);
  const [apicall, setcall] = useState(0);

  React.useEffect(() => {
    let pt = JSON.parse(localStorage.getItem('path'));
    //let cr = JSON.parse(localStorage.getItem('countRecords'));
    let tmp = JSON.parse(localStorage.getItem('Template'));
    let ti = JSON.parse(localStorage.getItem('Time'));
    // let vi = JSON.parse(localStorage.getItem('countViews'));
    let cm = JSON.parse(localStorage.getItem('countManual'));
    let sd = JSON.parse(localStorage.getItem('setdownload'));
    let dp = JSON.parse(localStorage.getItem('downloadPath'));
    if (
      pt !== null &&
      //  cr !== null &&
      tmp !== null &&
      ti !== null &&
      //  vi !== null &&
      cm !== null &&
      sd !== null &&
      dp !== null
    ) {
      setPath(pt);
      setTemplate(tmp);
      setTime(ti);
      //setCountViews(vi);
      //setCountRecords(cr);
      setCountManual(cm);
      setdownload(sd);
      setDownloadPath(dp);
    }

    var body = { path: setdownload, template: Template };
    if (apicall < 1) {
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-token': '11111111111111111111111111111111',
        },
        data: body,
        url: 'http://localhost:5000/compress',
      }).then((resp) => {
        // console.log(resp.data);
        if (resp.data) {
          console.log(resp.data);
          console.log(
            resp.data['path'],
            resp.data['count'],
            resp.data['record']
          );
          setd_path(resp.data['path']);
          setCountViews(resp.data['count']);
          setCountRecords(resp.data['record']);

          setcall(apicall + 1);
        }
      });
    }
  }, []);

  if (time) {
    var a = time;
    var b = new Date().toLocaleString();
    var milliseconds = new Date(b) - new Date(a);
    var seconds = milliseconds / 1000;
    var minutes = Math.round(milliseconds / 60000);
  }
  if (minutes) {
    console.log(minutes);
    console.log(milliseconds);
  }
  if (path) var length = path.length;

  return (
    <div>
      <div className='background-login'>
        <Navbar />
        <div className='col-sm-4'>
          <div className='box-finalresult'>
            <div>
              <Link
                to={'http://localhost:5000/' + d_path}
                download='result.csv'
                className='btn btn-warning'
                style={{
                  width: '70%',
                  height: '-20%',
                  background: '#FF8000',
                  borderRadius: '12px',
                  padding: '3.5%',
                  display: 'flex',
                  position: 'absolute',
                  alignItems: 'center',
                }}
              >
                <img src={dwnld} alt='#' style={{ width: '12%' }} />
                &nbsp;&nbsp; DOWNLOAD AS PDF
              </Link>
              <Link
                to='hero'
                className='btn btn-warning'
                style={{
                  width: '70%',
                  height: '-20%',
                  padding: '3.5%',
                  background: '#7E7E7E',
                  borderRadius: '12px',
                  display: 'flex',
                  marginTop: '20%',
                  position: 'absolute',
                  alignItems: 'center',
                }}
              >
                <img src={dwnld2} alt='#' style={{ width: '15%' }} />
                &nbsp;&nbsp; RETURN HOME
              </Link>
            </div>
            <div style={{ marginTop: '60%' }}>
              <hr />
              {Template !== 'Liquid Telecom' ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    font: 'normal normal normal 17px/38px Roboto',
                  }}
                >
                  <td>Total Views identified</td>
                  <td style={{ marginLeft: '26%' }}>
                    {countViews ? countViews : '0'}
                  </td>
                </div>
              ) : (
                ''
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  font: 'normal normal normal 17px/38px Roboto',
                }}
              >
                <td>No Of files Processed</td>
                <td style={{ marginLeft: '27%' }}> {length ? length : '0'}</td>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  font: 'normal normal normal 17px/38px Roboto',
                }}
              >
                <td>No Of Records</td>
                <td style={{ marginLeft: '43%' }}>
                  {countRecords ? countRecords : '0'}
                </td>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  font: 'normal normal normal 17px/38px Roboto',
                }}
              >
                <td>Manually corrected records</td>
                <td style={{ marginLeft: '14%' }}>
                  {countManual ? countManual : ''}
                </td>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  font: 'normal normal normal 17px/38px Roboto',
                }}
              >
                Total Time
                <td style={{ marginLeft: '54%' }}>
                  {seconds >= 300 ? (
                    <td>{minutes}min</td>
                  ) : (
                    <td>{seconds}sec</td>
                  )}
                </td>
              </div>
              {/*<h5>
            Total Views identified:
            <h6 className='text-success'>
              {views ? views : 'No view Available'}
            </h6>
          </h5>
          <br />
          <h5>
            No of Files Processed:
            <h6 className='text-success'> {length ? length : 0}</h6>
          </h5>
          <br />
          <h5>
            No of Records:
            <h6 className='text-success'>{record ? record : 0}</h6>
          </h5>
          <br />
          <h5>
            Manual corrected Records:
            <h6 className='text-success'>{countManual ? countManual : 0}</h6>
          </h5>
          <br />
          <h5>
            Time:
            <h6 className='text-success'>{Math.round(minutes)} min</h6>
          </h5>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
