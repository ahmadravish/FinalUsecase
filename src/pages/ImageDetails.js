import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import pdf from '../pdf.png';




const ImageDetails = (props) => {
  const [imageData, setImageData] = useState(null);

  const fileObj = props.location.fileObj.fileObj;
  const path = props.location.path.path;

  const countViews = props.location.countViews.countViews;

  const time = props.location.time.time;
  const urlArray = props.location.urlArray.urlArray;
  const countRecords = props.location.countRecords.countRecords;
  const countManual = props.location.countManual.countManual;
  const setdownload = props.location.setdownload.setdownload;
  const fileImage = props.location.fileImage.fileImage;

  const downloadPath = props.location.downloadPath.downloadPath;
  const Template = props.location.Template.Template;
  const [d_path,setpath]=useState(null)
  const [impath,setimpath]=useState(setdownload)
  const [views,setviews]=useState("Loading...")
  const [record,setrecord]=useState("Loading...")
  const [apicall,setcall]=useState(0)


  if (imageData) {
    var result = Object.entries(imageData.Image);
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
  const length = path.length;
  useEffect(() => {
  

  var body={"path":setdownload,"template":Template}
  if (apicall<1){
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
                console.log(resp.data)
                console.log(resp.data["path"],resp.data["count"],resp.data["record"])
		setpath(resp.data["path"])
		setviews(resp.data["count"])
		setrecord(resp.data["record"])
		setimpath(resp.data["image"])
                setcall(apicall+1)
          }
        })}
})


  if (Template === 'Liquid Telecom') {

    return (
      <>
        <Navbar />
        <div>
        <div className='col-sm-4'>
          <div className='box-finalresult'>
            <h1 className='text-dark'>
              <u>Final Result</u>
            </h1>

            <br />
            <h5>
              No of Files Processed:
              <h6 className='text-success'> {length ? length : 0}</h6>
            </h5>
            <br />
            <h5>
              No of Records:
              <h6 className='text-success'>
                {record ? record : ''}
              </h6>
            </h5>
            <br />
            <h5>
              Manual corrected Records:
              <h6 className='text-success'>{countManual ? countManual : 0}</h6>
            </h5>
            <br />
            <h5>
              Time:
              <h6 className='text-success'>
                {Math.round(minutes)} min
              </h6>
            </h5>

            </div>
            </div>

                  <a href={'http://localhost:5000/' + d_path} download='result.csv'>
                  <button>Download</button>
                </a>
           </div>

      </>
    );
  }
  return (
    <div>
      <Navbar />

      <div className='col-sm-4'>
        <div className='box-finalresult'>
          <h1 className='text-dark'>
            <u>Final Result</u>
          </h1>
          <h5>
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
            <h6 className='text-success'>
              {Math.round(minutes)} min
            </h6>
          </h5>
	
            </div>
            </div>
	 
           <a href={'http://localhost:5000/' + d_path} download='result.csv'>
                  <button>Download</button>
                </a>
           </div>
         
  );
};

export default ImageDetails;
