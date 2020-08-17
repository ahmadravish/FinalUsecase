import React from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { uuid } from 'uuidv4';

export default function SearchForm({
  setSearchTerm,
  setSubmit,
  setTop,
  setImages,
}) {
  const serachValue = React.useRef('');

  React.useEffect(() => {
    serachValue.current.focus();
  }, []);

  const [Keyword, setKeyword] = React.useState(true);
  const [NewFileObj, setNewFileObj] = React.useState(null);
  const [topImage, setTopImage] = React.useState(2);
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, updateUploadProgress] = React.useState(0);
  const [imageKeyword, setImageKeyword] = React.useState('A');

  var ImagesResult;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const searchImage = () => {
    setSearchTerm(serachValue.current.value);

    // console.log(serachValue.current.value);
  };

  const keywordSearchImage = () => {
    setImageKeyword(serachValue.current.value);
  };

  const searchByImage = (e) => {
    setUploading(true);

    const fileObj = e.target.files[0];
    setNewFileObj(fileObj);

    console.log(imageKeyword);
    console.log(topImage);
    var body = new FormData();
    body.append('image', NewFileObj);
    body.set('top', topImage);
    body.set('token', imageKeyword);

    axios({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-token': uuid(),
      },
      data: body,
      url: 'http://localhost:5000/advanced',
      onUploadProgress: (ev) => {
        const progress = (ev.loaded / ev.total) * 100;
        updateUploadProgress(Math.round(progress));
      },
    })
      .then((resp) => {
        setUploading(false);
        if (resp.data) {
          var result = Object.entries(resp.data);

          for (var i = 0; i < result.length; i++) {
            ImagesResult[i] = result[i][1][0];
          }
        }
        if (ImagesResult) setImages(ImagesResult);
      })
      .catch((err) => console.error(err));
  };

  const submitSearch = () => {
    setSubmit(true);
  };

  const changeTypeKeyword = () => {
    setKeyword(true);
    setSubmit(false);
  };
  const changeTypeImage = () => {
    setKeyword(false);
    setSubmit(false);
  };

  return (
    <section className='section'>
      <h2 className='section-title'>search Images</h2>
      <div className='section-title'>
        <button className='btn btn-info ' onClick={changeTypeKeyword}>
          Keyword
        </button>

        <button className='btn btn-info ' onClick={changeTypeImage}>
          Image
        </button>
      </div>
      {Keyword ? (
        <form className='form serach-form' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='name'>search your Image By Keyword</label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={searchImage}
              ref={serachValue}
            />
            <br />
            <div class='input-group sm-3'>
              <div class='col-xs-4'>
                <label for='sel1'>Select No of Results:</label>
                <select
                  class='custom-select'
                  id='sel1'
                  name='sellist1'
                  onChange={(e) => setTop(e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
            </div>
            <br />
            <br />
            <button
              type='submit'
              className='btn btn-info'
              onClick={submitSearch}
            >
              Submit
            </button>
            <br />
          </div>
        </form>
      ) : (
        <form className='form serach-form' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='name'>search your Image By Image</label>
            <input
              type='file'
              name='name'
              id='name'
              onChange={searchByImage}
              ref={serachValue}
            />
            <br />
            <br />
            <label htmlFor='name'>search your Image By Keyword</label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={keywordSearchImage}
              ref={serachValue}
            />
            <br />
            <br />
            <div class='input-group sm-3'>
              <div class='col-xs-4'>
                <label for='sel1'>Select No of Results:</label>
                <select
                  class='custom-select'
                  id='sel1'
                  name='sellist1'
                  onChange={(e) => setTopImage(e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
            </div>
            <br />
            <br />
            <button
              type='submit'
              className='btn btn-info'
              onClick={submitSearch}
            >
              Submit
            </button>
            <br /> <br />
          </div>
          {uploading ? (
            <div className='progress-bar-container'>
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
        </form>
      )}
    </section>
  );
}
