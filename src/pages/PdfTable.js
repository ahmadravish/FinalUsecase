import React, { Fragment, useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import pdf from '../pdf.png';

function PdfTable(props) {
  const fileObj = props.location.fileObj.fileObj;
  const path = props.location.path.path;
  const urlArray = props.location.urlArray.urlArray;
  const countViews = props.location.countViews.countViews;

  const Template = props.location.Template.Template;
  const time = props.location.time.time;


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
   const [items] = useState([]);
  const [Row, setCurrentRow] = useState(0);


  

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
        setRecordCount(Object.keys(resp.data).length);
        setSelectImg(true);
        
        
      })
      .catch((err) => console.error(err));
  };

  const setEdit = (ele, Row) => {
    console.log(ele);
    setEditInput(!editInput);
    setEditRow(ele);
    setCurrentRow(Row);
  };

  const setRecordCount = (count) => {
    setCountRecords( count);
    console.log(countRecords)

  };

  // const onChange_row = (e) => setEmptyRow({ [e.target.name]: e.target.value });

  const onChange_edit = (e) => {
    console.log(e.target.value);
    setEditValue(e.target.value);
  };

  const AddEditInput = (col) => {
    setCountManual(countManual + 1);

    ManualResult.push({ Row, col, editValue });
    console.log(ManualResult);
    setEditValue(null);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    
    // setCountManual(countManual / 4);
    console.log(ManualResult);
    var finalResult = {
      manual: ManualResult,
      template: Template,
      image: fileImage,
      part: '',
      record:countRecords
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
        window.alert("Data saved successfully")
        setDownloadPath(resp.data);
	
      setdownload.push([resp.data,""]);

  
        
      })
      .catch((err) => console.error(err));
  };

  /*if (inputTable) {
    Object.entries(inputTable).map((ele) =>
      ele[1].map((ele2) => console.log(ele2))
    );

    console.log(inputTable);
  }*/

  return (
    <Fragment>
      <Navbar />
      <div style={{"margin-left":"7%"}}>
      <h1 className='cnt-img'>
        {path.length} File/s Loaded
      </h1>
      <p className='cnt-img' style={{"color":"orange"}}>**Please select a file to start processing</p>
      <div className='row'>
        
        <div class='col-sm-4'>
          {path.map((img, key) => {
            return (
              <>
                <div className='box-tableview-image'>
                  

                  <div className='form-group preview'>
                    <img src={pdf || ' '} alt='input Image' />
                  </div>

                  <br />
                  <button
                    className='btn btn-warning'
                    onClick={() => {
                      setMainTable(img[0]);
                    }}
                  >
                    select
                  </button>
                </div>
              </>
            );
          })}
        </div>
	{selectImg ? (
        <>
        <div class='col-sm-4'>
          

          <div className='box-detections'>
            <h1>PDF View</h1>
            
              
                  
                    <iframe height="950px" width="300px"
                      src={'http://localhost:5000/' + fileImage}
                      //src={img[0]}
                    />
                  
                
          </div>
        </div>

        <div class='col-sm-4'>
          <div className='box-detections'>
            <h1>Details</h1>
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
                                  <td>{ele2}</td>
                                </>
                              );
                            })}
                        {key === 0 ? (
                          ''
                        ) : (
                          <td>
                            <button
                              className='btn btn-warning'
                              style={{ padding: '3.7px' }}
                              onClick={() => setEdit(ele[1], key)}
                            >
                              Edit
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  : ''}
              </tbody>
            </table>
          </div>

            
              
             <div className='box-editInput'>
            <h2>Edit Input Values</h2>
                {/*} <button
                  type='button'
                  className='btn btn-warning'
                  onClick={setEdit}
                >
                  Edit Values
            </button>*/}
                <br />
                <br />

                  {/* <table class='table table-striped'>
                  <thead>
                    <tr>
                      <th>Row number</th>
                      <th>Cable name</th>
                      <th>Cable length</th>
                      <th>Entry point</th>
                      <th>Exit point</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type='text'
                          placeholder='enter row number'
                          name='row'
                          value={row}
                          onChange={(e) => onChange_row(e)}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          placeholder='enter name of cable'
                          name='name'
                          value={name}
                          onChange={(e) => onChange_name(e)}
                        />
                      </td>
                      <td>
                        <input
                          type='text '
                          placeholder='enter length of cable'
                          name='length'
                          value={length}
                          onChange={(e) => onChange_length(e)}
                        />
                      </td>
                      <td>
                        <input
                          type='text '
                          placeholder='enter entry point'
                          name='entry'
                          value={entry}
                          onChange={(e) => onChange_entry(e)}
                        />
                      </td>
                      <td>
                        <input
                          type='text '
                          placeholder='enter exit point'
                          name='exit'
                          value={exit}
                          onChange={(e) => onChange_exit(e)}
                        />
                      </td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-warning'
                          onClick={onManual_Add}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
            </table> */}
                
                  <table className='table'>
                    <tbody>
                      {editRow
                        ? editRow.map((val, k) => (
                            <tr>
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
                                  />
                                </td>
                                <td>
                                  <button
                                    className='btn btn-warning'
                                    style={{ padding: '3.7px' }}
                                    onClick={() => AddEditInput(k)}
                                  >
                                    Add
                                  </button>
                                </td>
                              </div>
                            </tr>
                          ))
                        : ''}
                    </tbody>
                  </table>
		 
                    


		
		<form onSubmit={(e) => onSubmit(e)}>
		<h6>**Please click on submit button once the detections are verified</h6>
                    <button className='btn btn-warning' type='submit'>
                      Submit
                    </button>
                  
                </form>
              
            
            <br />

            <br />
	   
          </div>
        </div></>) : (
              ''
            )}
      </div>
{items && path && items.length === path.length ? (
            <div className='single-btn'>
             
              <Link
                to={{
                  pathname: '/imagedetails',
                  countViews: { countViews },
                  countRecords: { countRecords },
                  countManual: { countManual },
                  fileObj: { fileObj },
                  path: { path },
                  urlArray: { urlArray },
                  Template: { Template },
                  time: { time },
                  setdownload: { setdownload },
                  fileImage: { fileImage },

                  downloadPath: { downloadPath },
                }}
                className='btn btn-warning btn-lg'
              >
                Proceed
              </Link>
            </div>) :(
              <h6>NOTE:Check all Pdfs to proceed to next page</h6>
            )}
</div>
    </Fragment>
  );
}

export default PdfTable;

