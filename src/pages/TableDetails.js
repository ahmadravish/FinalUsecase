import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Modal, Button } from 'react-bootstrap';
import Group84 from '../img/Group84.png';
import exp53 from '../img/exp53.png';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <img
          src={'http://localhost:5000/' + props.image}
          alt='$'
          width='900px'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TableDetails(props) {
  const [inputTable, setInputTable] = useState(null);
  const [fileImage, setFileImage] = useState(null);

  const [ManualResult] = useState([]);
  const [setdownload] = useState([]);
  const [downloadPath, setDownloadPath] = useState(null);
  const [partName, setPartName] = useState(null);

  const [selectImg, setSelectImg] = useState(false);
  const [countRecords, setCountRecords] = useState(0);
  const [countManual, setCountManual] = useState(0);

  const [result, setResult] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const [Manualtable, setDisplayTable] = useState([['Details', 'Input']]);

  const [countViews, setCountViews] = useState(0);
  const [path, setPath] = useState(null);

  const [Template, setTemplate] = useState(null);
  const [time, setTime] = useState(null);

  const [items] = useState([]);

  React.useEffect(() => {
    let pt = JSON.parse(localStorage.getItem('path'));

    let tmp = JSON.parse(localStorage.getItem('Template'));
    let ti = JSON.parse(localStorage.getItem('Time'));
    let vi = JSON.parse(localStorage.getItem('countViews'));
    if (pt != null) setPath(pt);
    if (tmp !== null && ti !== null) {
      setTemplate(tmp);
      setTime(ti);
      setCountViews(vi);
    }
  }, []);

  const handlePartName = (e) => {
    //console.log(e.target.value);
    setPartName(e.target.value);
  };

  const setMainTable = (key) => {
    setFileImage(key);
    //  console.log(key);
    if (items.indexOf(key) === -1) items.push(key);
    setDisplayTable([['Details', 'Input']]);
    var body = new FormData();
    body.append('image', key);
    body.set('template', Template);
    body.set('part_name', partName);

    //for (var [key, value] of body.entries()) console.log(key, value);

    axios({
      method: 'post',
      data: body,
      url: 'http://localhost:5000/table_details',
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-token': '11111111111111111111111111111111',
      },
    })
      .then((resp) => {
        //console.log(resp.data);
        setInputTable(resp.data);
        setCountRecords(countRecords + 1);
        //setRecordCount(Object.keys(resp.data.details.red).length);
        localStorage.setItem('countRecords', JSON.stringify(countRecords + 1));
        setSelectImg(true);
      })
      .catch((err) => console.error(err));
  };

  const [emptyFields, setEmptyFields] = useState({
    input: '',
  });
  const [emptyValues, setEmptyValues] = useState({
    output: '',
  });

  const { input } = emptyFields;
  const { output } = emptyValues;

  const onChange_Inputfield = (e) =>
    setEmptyFields({ [e.target.name]: e.target.value });
  const onChange_outputField = (e) =>
    setEmptyValues({ [e.target.name]: e.target.value });

  const onManual_Add = () => {
    ManualResult.push([input, output]);
    Manualtable.push([input, output]);

    setEmptyFields({ input: '' });
    setEmptyValues({ output: '' });
  };
  const handleTable = () => {
    return Manualtable.map((key, index) => {
      return (
        <tr>
          <td
            key={index}
            style={{
              textAlign: 'left',
              font: 'normal normal 300 15px/32px Roboto',
              letterSpacing: '0px',
              color: '#141414',
            }}
          >
            {key[0]}
          </td>
          <td></td>
          <td></td>
          <td
            key={index}
            style={{
              textAlign: 'left',
              font: 'normal normal 300 15px/32px Roboto',
              letterSpacing: '0px',
              color: '#141414',
            }}
          >
            {key[1]}
          </td>
        </tr>
      );
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setCountManual(countManual + 1);
    localStorage.setItem('countManual', JSON.stringify(countManual + 1));

    var finalResult = {
      manual: ManualResult,
      image: fileImage,
      part: partName,
      template: Template,
      record: countRecords,
    };
    setResult(finalResult);
    var image = fileImage;
    // console.log(image);
    //console.log(finalResult);
    var body = finalResult;

    axios({
      method: 'put',
      data: body,
      dataType: 'json',
      url: 'http://localhost:5000/image_details',
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-token': '11111111111111111111111111111111',
      },
    })
      .then((resp) => {
        window.alert('Data saved successful');
        // console.log(resp);
        setDownloadPath(resp.data);
        setdownload.push([resp.data, fileImage]);
        localStorage.setItem('downloadPath', JSON.stringify(resp.data));
        localStorage.setItem('setdownload', JSON.stringify(setdownload));
        ManualResult = [];
      })
      .catch((err) => console.error(err));
  };

  //try {
  if (inputTable) {
    var details = inputTable.details;
    var red = details.red;
    var green = details.green;
    /*console.log(details);
      console.log(red);
      console.log(green);*/
  }

  return (
    <Fragment>
      <Navbar />
      <div className='background-login' style={{ position: 'unset' }}>
        <div style={{ 'margin-left': '7%' }}>
          <p className='cnt-img' style={{ color: 'orange' }}></p>
          <div class='row'>
            <div class='col-sm-3'>
              <div
                className='box-tableview-image'
                style={{ marginLeft: '43%' }}
              >
                {path
                  ? path.map((img, key) => {
                      return (
                        <div>
                          <div className='form-group preview'>
                            <div className='container'>
                              <img
                                // src={'http://localhost:5000/' + img[0] || ' '}
                                src={img[0]}
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
                                  setMainTable(img[0]);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ''}
              </div>
            </div>

            <>
              <div className='col-sm-3'>
                <div className='modal-img'>
                  <div className='form-group preview'>
                    {/* <input
                        type='text'
                        placeholder='part name'
                        onChange={handlePartName}
                     />*/}
                    {fileImage ? (
                      <div className='container'>
                        <iframe
                          src={'http://localhost:5000/' + fileImage || ' '}
                          width='100%'
                          borderRadius='10%'
                          zoom='200%'
                        />
                        {/* <img
                          src={'http://localhost:5000/' + fileImage || ' '}
                          //src={fileImage || ' '}
                          className='image'
                          alt='input Image'
                          onClick={() => setModalShow(true)}
                        />
                        <small style={{ color: 'orange' }}>
                          *click to see full size image
                        </small>
                        <MyVerticallyCenteredModal
                          show={modalShow}
                          image={fileImage}
                          onHide={() => setModalShow(false)}
                       />*/}
                      </div>
                    ) : (
                      <center>
                        <div style={{ marginTop: '50%' }}>
                          <img src={Group84} alt='%' style={{ width: '10%' }} />
                          <br />
                          <small>Select the drawing from</small>
                          <br />
                          <small>the left plane</small>
                        </div>
                      </center>
                    )}
                  </div>
                </div>
                {path && items && items.length === path.length ? (
                  <div className='single-btn'>
                    <Link
                      to='/imagedetails'
                      className='btn btn-warning'
                      style={{
                        padding: '4.7%',
                        letterSpacing: '0px',
                        lineHeight: '0',
                        position: 'absolute',
                        background: '#ff8000',
                        color: '#ffffff',
                        marginLeft: '40%',
                        width: '30%',
                        height: '3%',
                        fontSize: '70%',
                        textAlign: 'center',
                        marginTop: '-5%',
                        borderRadius: '7%',
                      }}
                    >
                      PROCEED
                    </Link>
                  </div>
                ) : (
                  <small style={{ color: 'orange', marginLeft: '15%' }}>
                    NOTE:Check all Images to proceed to next page
                  </small>
                )}
              </div>

              <div class='col-sm-6'>
                <div className='box-detections'>
                  <h2
                    style={{
                      textAlign: 'left',
                      font: 'normal normal 300 28px/32px Roboto',
                      letterSpacing: '0px',

                      color: '#141414',
                    }}
                  >
                    Detections
                  </h2>

                  <table className='table'>
                    <tbody>
                      <div
                        style={{
                          textAlign: 'left',
                          font: 'normal normal 300 15px/32px Roboto',
                          letterSpacing: '0px',
                          color: '#141414',
                          background: '#F5F5F5',
                        }}
                      >
                        <td>Detection Level</td>
                        <td></td>
                        <td>
                          <span
                            className='dot'
                            style={{
                              height: '10px',
                              width: '10px',
                              backgroundColor: '#98E52F',
                              borderRadius: '50%',
                              display: 'inline-block',
                            }}
                          />{' '}
                          Good
                        </td>
                        <td></td>
                        <td>
                          <span
                            className='dot'
                            style={{
                              height: '10px',
                              width: '10px',
                              backgroundColor: '#FF1515',
                              borderRadius: '50%',
                              display: 'inline-block',
                            }}
                          />{' '}
                          Bad
                        </td>
                      </div>
                      <br />
                      <br />
                      {selectImg && red
                        ? Object.entries(red).map((value) => {
                            return (
                              <>
                                {value[1] ? (
                                  <tr className='table'>
                                    <td
                                      style={{
                                        textAlign: 'left',
                                        font:
                                          'normal normal 300 15px/32px Roboto',
                                        letterSpacing: '0px',
                                        color: '#141414',
                                      }}
                                    >
                                      {value[0]}&nbsp; &nbsp; &nbsp;&nbsp;
                                      &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                      {value[1]}
                                    </td>

                                    <td>
                                      <span
                                        className='dot'
                                        style={{
                                          height: '10px',
                                          width: '10px',
                                          backgroundColor: '#FF1515',
                                          borderRadius: '50%',
                                          display: 'inline-block',
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ) : (
                                  ' '
                                )}
                              </>
                            );
                          })
                        : ''}
                      {/*  </tbody>
                    </table>
                    <table className='table'>
                    <tbody>*/}
                      {selectImg && green
                        ? Object.entries(green).map((value) => {
                            return (
                              <>
                                {value[1] ? (
                                  <tr className='table'>
                                    <td
                                      style={{
                                        textAlign: 'left',
                                        font:
                                          'normal normal 300 15px/32px Roboto',
                                        letterSpacing: '0px',
                                        color: '#141414',
                                      }}
                                    >
                                      {value[0]}&nbsp; &nbsp; &nbsp;&nbsp;
                                      &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                      {value[1]}
                                    </td>

                                    <td>
                                      <span
                                        className='dot'
                                        style={{
                                          height: '10px',
                                          width: '10px',
                                          backgroundColor: '#98E52F',
                                          borderRadius: '50%',
                                          display: 'inline-block',
                                          marginLeft: '10%',
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ) : (
                                  ' '
                                )}
                              </>
                            );
                          })
                        : ''}
                    </tbody>
                  </table>
                </div>
                <div className='box-editInput'>
                  <h2
                    style={{
                      textAlign: 'left',
                      font: 'normal normal 300 28px/32px Roboto',
                      letterSpacing: '0px',

                      color: '#141414',
                    }}
                  >
                    Add More
                  </h2>
                  <small style={{ color: 'orange' }}>
                    **Please click on submit button once the detections are
                    verified
                  </small>
                  <table className='table'>
                    <tbody>
                      <tr>{handleTable()}</tr>
                    </tbody>
                  </table>
                  <br />
                  <br />
                  {selectImg ? (
                    <>
                      <div>
                        <table class='table '>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type='text'
                                  placeholder='Add Value'
                                  name='input'
                                  value={input}
                                  onChange={(e) => onChange_Inputfield(e)}
                                  style={{
                                    background: '#FFFFFF ',
                                    border: '1px solid #FF8000',
                                    borderRadius: '7%',
                                    padding: '2.7%',
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  type='text '
                                  placeholder='Add Value'
                                  name='output'
                                  value={output}
                                  onChange={(e) => onChange_outputField(e)}
                                  style={{
                                    background: '#FFFFFF ',
                                    border: '1px solid #FF8000',
                                    borderRadius: '7%',
                                    padding: '2.7%',
                                  }}
                                />
                              </td>
                              <td>
                                <img
                                  src={exp53}
                                  alt='#'
                                  onClick={onManual_Add}
                                  style={{ width: '37%', cursor: 'pointer' }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <br />
                      </div>
                      <br />
                    </>
                  ) : (
                    ''
                  )}

                  {fileImage ? (
                    <form onSubmit={(e) => onSubmit(e)}>
                      <button
                        className='btn btn-warning'
                        type='submit'
                        style={{
                          padding: '2.7%',
                          letterSpacing: '0px',
                          lineHeight: '0',
                          position: 'absolute',
                          background: '#ff8000',
                          color: '#ffffff',
                          marginLeft: '4%',
                          fontSize: '70%',
                          textAlign: 'center',
                          marginTop: '-2%',
                          borderRadius: '11%',
                        }}
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    ''
                  )}
                  <br />
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </Fragment>
  );
  /*} catch (error) {
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
  }*/
}

export default TableDetails;
