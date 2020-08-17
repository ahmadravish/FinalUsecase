import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Navbar from '../components/Navbar';

import { Modal, Button } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <img src={'http://localhost:5000/'+props.image} alt='$' width="900px" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TableDetails(props) {
  const fileObj = props.location.fileObj.fileObj;
  const path = props.location.path.path;
  const urlArray = props.location.urlArray.urlArray;
  const countViews = props.location.countViews.countViews;
  const [items] = useState([]);
  const Template = props.location.Template.Template;
  const time = props.location.time.time;
  var table=[];
  var record = 0;
  var manual = 0;
  if (props.location.countRecords)
    record = props.location.countRecords.countRecords;

  if (props.location.countManual)
    manual = props.location.countManual.countManual;
  /*console.log(fileImage);
  console.log(partName);
  console.log(Template);
  console.log(props.location);
  console.log(countViews);*/

  const [inputTable, setInputTable] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [Manualtable,setDisplayTable] = useState([["Details","Input"]]);
  const [ManualResult] = useState([]);
  const [setdownload] = useState([]);
  const [downloadPath, setDownloadPath] = useState(null);
  const [partName, setPartName] = useState(null);

  const [selectImg, setSelectImg] = useState(false);
  const [countRecords, setCountRecords] = useState(record);
  const [countManual, setCountManual] = useState(0);

  const [result, setResult] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const handlePartName = (e) => {
    //console.log(e.target.value);
    setPartName(e.target.value);
  };

  const setMainTable = (key) => {
    setFileImage(key);
    console.log(key);
    if (items.indexOf(key) === -1) items.push(key);
    setDisplayTable([["Details","Input"]])
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
        setRecordCount(Object.keys(resp.data.details.green).length+Object.keys(resp.data.details.red).length);
        //setRecordCount(Object.keys(resp.data.details.red).length);
        setSelectImg(true);
      })
      .catch((err) => console.error(err));
  };

  /*const [formData, setFormData] = useState({
    sheet: '',
    scale: '',
    material: '',
    company: '',
    linear: '',
    angular: '',
    tolerance: '',
    partname: '',
  });*/

  const [emptyFields, setEmptyFields] = useState({
    input: '',
  });
  const [emptyValues, setEmptyValues] = useState({
    output: '',
  });

  /*const {
    sheet,
    scale,
    material,
    company,
    linear,
    angular,
    tolerance,
    partname,
  } = formData;*/
  const { input } = emptyFields;
  const { output } = emptyValues;

  /*const onChange_fun = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };*/

  const onChange_Inputfield = (e) =>
    setEmptyFields({ [e.target.name]: e.target.value });
  const onChange_outputField = (e) =>
    setEmptyValues({ [e.target.name]: e.target.value });

  const onManual_Add = () => {
    setCountManual(countManual + 1);
    ManualResult.push([input, output]);
    Manualtable.push([input, output]);
    
    setEmptyFields({ input: '' });
    setEmptyValues({ output: '' });
  };
  const handleTable=()=>{
	
	return Manualtable.map((key,index)=>{
	return <tr><td style={{"width":"100px","border-spacing": "5px","border": "1px solid black", "border-collapse": "collapse"}} key={index}>{key[0]}</td><td style={{"width":"100px","border-spacing": "5px","border": "1px solid black", "border-collapse": "collapse"}} key={index}>{key[1]}</td></tr>
})
}
  const onSubmit = async (e) => {
    e.preventDefault();
    
    var finalResult = {
      manual: ManualResult,
      image: fileImage,
      part: partName,
      template: Template,
      record:countRecords
    };
    setResult(finalResult);
    var image = fileImage;
    console.log(image);
    console.log(finalResult);
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
        window.alert("Data saved successful")
        console.log(resp);
        setDownloadPath(resp.data);
        setdownload.push([resp.data,fileImage]);
	ManualResult=[];
      })
      .catch((err) => console.error(err));
  };

  const setRecordCount = (count) => {
    setCountRecords( count);
  };

  try {
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
	<div style={{"margin-left":"7%"}}>
	<p className='cnt-img' style={{"color":"orange"}}>**Please select a file to start processing</p>
        <div class='row'>
          <div class='col-sm-4 '>
            <div>
              {path.map((img, key) => {
                return (
                  <div className='box-tableview-image'>
                    
                    <div className='form-group preview'>
                      <img
                        src={'http://localhost:5000/' + img[0] || ' '}
                        alt='input Image'
                      />
                    </div>
                    <br />
                    
                    <br />
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
                );
              })}
            </div>
          </div>

             
                {fileImage ? (
                 
                    //<iframe src={'http://localhost:5000/' + fileImage || ' '} width="100%"/>
                    <>
	             <div class='col-sm-8'>
		    <div className='box-detections'>
		      <div className='form-group preview'>
		      <input
                      type='text'
                      placeholder='part name'
                      onChange={handlePartName}
                    />
                      <img
                      src={'http://localhost:5000/' + fileImage || ' '}
                      //src={fileImage || ' '}
                      alt='input Image'
                    />

                    <Button
                      className='btn btn-warning'
                      onClick={() => setModalShow(true)}
                    >
                      View Full Size Image
                    </Button>

                    <MyVerticallyCenteredModal
                      show={modalShow}
                      image={fileImage}
                      onHide={() => setModalShow(false)}
                    />
                  
              </div>
      
              <h2>Detections</h2>
		
              <table className='table'>
                <tbody>
                  {selectImg && red
                    ? Object.entries(red).map((value) => {
                        return (
                          <>
                            {value[1] ? (
                              <tr className='table-danger'>
                                <td>
                                  {value[0]}: {value[1]}
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
              <table className='table'>
                <tbody>
                  {selectImg && green
                    ? Object.entries(green).map((value) => {
                        return (
                          <>
                            {value[1] ? (
                              <tr className='table-success'>
                                <td>
                                  {value[0]}: {value[1]}
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
              <h2>Edit Input Values</h2>
              <h6>**Please click on submit button once the detections are verified</h6>
              {selectImg ? (
                  <>
		  <div>
                  <table class='table table-striped'>
                    <thead>
                      <tr>
                        <th>Detail</th>
                        <th>Input</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td>Sheet</td>
                        <td>
                          <input
                            type='text '
                            placeholder='sheet'
                            name='sheet'
                            value={sheet}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Scale</td>
                        <td>
                          <input
                            type='text '
                            placeholder='scale'
                            name='scale'
                            value={scale}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Material</td>
                        <td>
                          <input
                            type='text '
                            placeholder='material'
                            name='material'
                            value={material}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Comapny</td>
                        <td>
                          <input
                            type='text '
                            placeholder='company'
                            name='company'
                            value={company}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Linear</td>
                        <td>
                          <input
                            type='text '
                            placeholder='linear'
                            name='linear'
                            value={linear}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Angular</td>
                        <td>
                          <input
                            type='text '
                            placeholder='angular'
                            name='angular'
                            value={angular}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Tolerance</td>
                        <td>
                          <input
                            type='text '
                            placeholder='tolerance'
                            name='tolerance'
                            value={tolerance}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Part Name</td>
                        <td>
                          <input
                            type='text '
                            placeholder='partname'
                            name='partname'
                            value={partname}
                            onChange={(e) => onChange_fun(e)}
                          />
                        </td>
                        </tr>*/}
                      <tr>
                        <td>
                          <input
                            type='text'
                            placeholder='enter Detail your choice'
                            name='input'
                            value={input}
                            onChange={(e) => onChange_Inputfield(e)}
                          />
                        </td>
                        <td>
                          <input
                            type='text '
                            placeholder='enter value of detail'
                            name='output'
                            value={output}
                            onChange={(e) => onChange_outputField(e)}
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
                  </table>
 		  <table style={{"border-spacing": "5px","border": "1px solid black", "border-collapse": "collapse"}}>
			
			<tbody>
                                
				<tr>{handleTable()}</tr>
			</tbody>
		  </table></div>
                  <br />
                  
                  
		 <br />
                 <br />
		<form onSubmit={(e) => onSubmit(e)}>
                  <button className='btn btn-warning' type='submit'>
                    Submit
                  </button>
                </form>
              </>
              ) : (
                ''
              )}
             <br />
              <br />
              {items.length === path.length ? (
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
              </div>): (
                <h6>NOTE:Check all Images to proceed to next page</h6>
              )}
            </div>
          </div></>
                ) : (
                  ''
                )}
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

export default TableDetails;
