import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import pdf from '../pdf.png';
import Group84 from '../img/Group84.png';
import exp54 from '../img/exp54.png';
import exp53 from '../img/exp53.png';

function PdfTable() {
  const [inputTable, setInputTable] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [selectImg, setSelectImg] = useState(false);
  const [downloadPath, setDownloadPath] = useState(null);
  const [setdownload] = useState([]);
  const [countRecords, setCountRecords] = useState(0);
  const [ManualResult] = useState([]);
  const [countManual, setCountManual] = useState(0);
  const [editInput, setEditInput] = useState(false);

  const [editValue, setEditValue] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [Row, setCurrentRow] = useState(0);

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

  const setMainTable = (key) => {
    setFileImage(key);

    console.log(key);
    if (items.indexOf(key) === -1) items.push(key);
    var body = new FormData();
    body.append('image', fileImage);
    body.set('template', Template);

    //for (var [key, value] of body.entries()) console.log(key, value);
    axios({
      method: 'post',
      data: body,
      url: 'http://localhost:5000/table',
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-token': '11111111111111111111111111111111',
      },
    })
      .then((resp) => {
        //console.log(resp.data);
        setInputTable(resp.data);
        // setRecordCount(Object.keys(resp.data).length);
        setSelectImg(true);
        setCountRecords(countRecords + 1);
        localStorage.setItem('countRecords', JSON.stringify(countRecords + 1));
      })
      .catch((err) => console.error(err));
  };

  const setEdit = (ele, Row) => {
    console.log(ele);
    setEditInput(!editInput);
    setEditRow(ele);
    setCurrentRow(Row);
  };

  const onChange_edit = (e) => {
    console.log(e.target.value);
    setEditValue(e.target.value);
  };

  const AddEditInput = (col) => {
    ManualResult.push({ Row, col, editValue });
    console.log(ManualResult);
    setEditValue(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setCountManual(countManual + 1);
    localStorage.setItem('countManual', JSON.stringify(countManual + 1));
    // setCountManual(countManual / 4);
    console.log(ManualResult);
    var finalResult = {
      manual: ManualResult,
      template: Template,
      image: fileImage,
      part: '',
      record: countRecords,
    };
    axios({
      method: 'put',
      data: finalResult,
      url: 'http://localhost:5000/image_details',
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-token': '11111111111111111111111111111111',
      },
    })
      .then((resp) => {
        window.alert('Data saved successfully');
        setDownloadPath(resp.data);
        setdownload.push([resp.data, '']);
        localStorage.setItem('downloadPath', JSON.stringify(resp.data));
        localStorage.setItem('setdownload', JSON.stringify(setdownload));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <Navbar />
      <div className='background-login' style={{ position: 'unset' }}>
        <div style={{ 'margin-left': '7%' }}>
          <p className='cnt-img' style={{ color: 'orange' }}>
            **Please select a file to start processing
          </p>
          <div className='row'>
            <div class='col-sm-3'>
              <div className='box-tableview-image'>
                {path
                  ? path.map((img, key) => {
                      return (
                        <>
                          <div className='form-group preview'>
                            <div className='container'>
                              <img
                                src={pdf || ' '}
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
                        </>
                      );
                    })
                  : ''}
              </div>
            </div>

            <>
              <div class='col-sm-3'>
                <div className='modal-img' style={{ height: '115%' }}>
                  <div className='form-group preview'>
                    {fileImage ? (
                      <iframe
                        height='900px'
                        width='300px'
                        src={'http://localhost:5000/' + fileImage}
                        //src={img[0]}
                      />
                    ) : (
                      <center>
                        {' '}
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
              </div>

              <div class='col-sm-6'>
                <div className='box-detections'>
                  <h1
                    style={{
                      textAlign: 'left',
                      font: 'normal normal 300 28px/32px Roboto',
                      letterSpacing: '0px',

                      color: '#141414',
                    }}
                  >
                    Details
                  </h1>

                  <table className='table'>
                    <tbody>
                      {inputTable
                        ? Object.entries(inputTable).map((ele, key) => (
                            <tr>
                              {key === 0
                                ? ele[1].map((ele2) => <th>{ele2}</th>)
                                : ele[1].map((ele2) => {
                                    return (
                                      <>
                                        <td
                                          style={{
                                            textAlign: 'left',
                                            font:
                                              'normal normal 300 15px/32px Roboto',
                                            letterSpacing: '0px',
                                            color: '#141414',
                                          }}
                                        >
                                          {ele2}
                                        </td>
                                      </>
                                    );
                                  })}
                              {key === 0 ? (
                                ''
                              ) : (
                                <>
                                  <td style={{ width: '10%' }}>
                                    <img
                                      src={exp54}
                                      alt='#'
                                      onClick={() => setEdit(ele[1], key)}
                                      style={{
                                        width: '120%',
                                        cursor: 'pointer',
                                      }}
                                    />
                                  </td>
                                </>
                              )}
                            </tr>
                          ))
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
                    Edit Values
                  </h2>
                  <small style={{ color: 'orange' }}>
                    **Please click on submit button once the value are verified
                  </small>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <table className='table'>
                      <tbody>
                        {editRow
                          ? editRow.map((val, k) => (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <td>
                                  <input
                                    type='text '
                                    placeholder={val}
                                    name={val}
                                    value={val.editValue}
                                    onChange={(e) => onChange_edit(e)}
                                    style={{
                                      background: '#FFFFFF ',
                                      border: '1px solid #FF8000',
                                      borderRadius: '7%',
                                      padding: '2.7%',
                                      textAlign: 'center',
                                    }}
                                  />
                                </td>
                                <td>
                                  <img
                                    src={exp53}
                                    alt='#'
                                    onClick={() => AddEditInput(k)}
                                    style={{
                                      width: '10%',
                                      cursor: 'pointer',
                                    }}
                                  />
                                </td>
                              </div>
                            ))
                          : ''}
                      </tbody>
                    </table>
                  </form>
                  {editRow ? (
                    <form onSubmit={(e) => onSubmit(e)}>
                      <button
                        className='btn btn-warning'
                        type='submit'
                        style={{
                          padding: '2.7%',
                          letterSpacing: '0px',
                          lineHeight: '0',
                          position: 'absolute',
                          width: '15%',
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
                  {items && path && items.length === path.length ? (
                    <div className='single-btn'>
                      <Link
                        to='/imagedetails'
                        className='btn btn-warning '
                        style={{
                          padding: '2.7%',
                          letterSpacing: '0px',
                          lineHeight: '0',
                          position: 'absolute',

                          marginLeft: '70%',
                          fontSize: '70%',
                          textAlign: 'center',

                          borderRadius: '11%',
                        }}
                      >
                        Proceed
                      </Link>
                    </div>
                  ) : (
                    <small style={{ color: 'orange' }}>
                      NOTE:Check all Pdfs to proceed to next page
                    </small>
                  )}
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PdfTable;
