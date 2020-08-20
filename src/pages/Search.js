import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import srch from '../img/srch.png';

const download = ({ item }) => {
  var element = document.createElement('a');
  var file = new Blob([item], { type: 'image/*' });
  element.href = URL.createObjectURL(file);

  //element.click();
};
const orange = '#e87902';
const white = '#F3EFEB';
const black = '#151413';
var Images = [];
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      keyword: false,
      advanced: false,
      token: ' ',
      top: 1,
      showImage: false,
      img_file: null,
      url_image: null,
      key_color: black,
      adv_color: black,
      margin: '50%',
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.changeTypeKeyword = this.changeTypeKeyword.bind(this);
    this.changeTypeImage = this.changeTypeImage.bind(this);
    this.setTop = this.setTop.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.searchByImage = this.searchByImage.bind(this);
    this.searchImage = this.searchImage.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  submitSearch() {
    if (this.state.token) {
      var body = new FormData();
      body.set('token', this.state.token);
      body.set('top', this.state.top);
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-token': '11111111111111111111111111111111',
        },
        data: body,
        url: 'http://localhost:5000/search',
      }).then((resp) => {
        // console.log(resp.data);
        if (resp.data) {
          var result = Object.entries(resp.data);
          //console.log(result.length);
          for (var i = 0; i < result.length; i++) {
            // console.log(result[i][1][0]);
            Images[i] = result[i][1][0];
            this.setState({ showImage: true });
            console.log(Images);
          }
        }
      });
    }
  }
  searchImage(event) {
    this.setState({ img_file: event.target.files[0] });

    console.log(event);
    this.setState({
      url_image: URL.createObjectURL(event.target.files[0]),
      function() {
        console.log(this.state.url_image);
      },
    });
    // console.log(event.target.files[0]);
    // console.log(this.state.url_image);
  }
  searchByImage() {
    if (this.state.token && this.state.img_file) {
      console.log(typeof this.state.img_file);
      var body = new FormData();
      body.append('image', this.state.img_file);
      body.set('top', this.state.top);
      body.set('token', this.state.token);

      axios({
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-token': '11111111111111111111111111111111',
        },
        data: body,
        url: 'http://localhost:5000/advanced',
      }).then((resp) => {
        if (resp.data) {
          var result = Object.entries(resp.data);

          for (var i = 0; i < result.length; i++) {
            Images[i] = result[i][1][0];
            this.setState({ showImage: true });
          }
        }
      });
    }
  }

  myChangeHandler = (event) => {
    this.setState({ token: event.target.value });
  };
  changeTypeKeyword() {
    this.setState({
      keyword: true,
      advanced: false,
      showImage: false,
      key_color: orange,
      adv_color: black,
      margin: '40%',
    });
  }
  changeTypeImage() {
    this.setState({
      advanced: true,
      keyword: false,
      showImage: false,
      key_color: black,
      adv_color: orange,
      margin: '55%',
    });
  }
  setTop = (event) => {
    this.setState({ top: event.target.value });
  };

  render() {
    try {
      return (
        <>
          <div>
            <Navbar />
          </div>
          <div>
            <div
              style={{
                width: '60%',
                'margin-left': '20%',
                'margin-top': '5%',
                display: 'flex',
                'align-items': 'center',
                position: 'absolute',
              }}
            >
              <form onSubmit={this.handleSubmit}>
                <section className='section'>
                  <div
                    className='section-title'
                    style={{
                      'background-color': black,
                      width: '330%',

                      height: '40%',
                      'border-radius': '8px',
                      display: 'flex',
                      'align-items': 'center',
                    }}
                  >
                    <button
                      className='btn btn-warning '
                      onClick={this.changeTypeKeyword}
                      style={{
                        'margin-left': '1%',
                        width: '60%',
                        border: 'none',
                        padding: '2.2%',
                        borderRadius: '5% 0% 0% 0%',
                        'background-color': this.state.key_color,
                        color: white,
                      }}
                    >
                      Text Search
                    </button>

                    <button
                      className='btn btn-warning '
                      onClick={this.changeTypeImage}
                      style={{
                        'margin-left': '45%',
                        width: '60%',
                        padding: '2.2%',
                        'background-color': this.state.adv_color,
                        border: 'none',
                        color: white,
                      }}
                    >
                      Cognitive Search
                    </button>
                  </div>
                </section>
              </form>
            </div>

            {(this.state.keyword || this.state.advanced) && (
              <>
                <div className='box-fa'>
                  {this.state.keyword}
                  {this.state.keyword && (
                    <div>
                      <div className='form-control'>
                        <div
                          style={{
                            position: 'flex-start',
                          }}
                        >
                          <input
                            type='text'
                            name='username'
                            placeholder='Start typing to search here!'
                            onChange={this.myChangeHandler}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #B9B9B9',
                              borderRadius: '12px',
                              width: '50%',
                              padding: '1.5%',
                              height: '7%',
                              font: 'normal normal normal 15px/35px Roboto',
                            }}
                          />
                          &nbsp; &nbsp;
                          <input
                            type='text'
                            id='sel1'
                            name='sellist1'
                            placeholder='Show results 1-100'
                            onChange={(e) => this.setTop(e)}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #B9B9B9',
                              borderRadius: '12px',
                              width: '20%',
                              height: '7%',
                              padding: '1.5%',
                              font: 'normal normal normal 13px/35px Roboto',
                            }}
                          />
                          <img
                            src={srch}
                            alt='#'
                            onClick={this.submitSearch}
                            style={{
                              width: '6%',
                              borderRadius: '50%',
                              cursor: 'pointer',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {this.state.advanced && (
                    <form
                      className='form serach-form'
                      onSubmit={this.handleSubmit}
                    >
                      <div className='form-control'>
                        <label htmlFor='name'>*Search by image</label>
                        <input
                          type='file'
                          name='name'
                          id='name'
                          required
                          onChange={this.searchImage}
                        />
                        <br />
                        <br />
                        <label htmlFor='name'>*Search by keyword</label>
                        <input
                          type='text'
                          name='name'
                          id='name'
                          required
                          onChange={this.myChangeHandler}
                        />
                        <br />
                        <br />
                        <div class='input-group sm-3'>
                          <div class='col-xs-4'>
                            <label for='sel1'>
                              Top results to be displayed:
                            </label>
                            <select
                              class='custom-select'
                              id='sel1'
                              name='sellist1'
                              onChange={(e) => this.setTop(e)}
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
                          className='btn btn-warning'
                          onClick={this.searchByImage}
                        >
                          Submit
                        </button>
                        <br /> <br />
                      </div>
                    </form>
                  )}
                </div>
                <div style={{ marginLeft: '10%' }}>
                  {(this.state.showImage || this.state.url_image) && (
                    <div
                      className='box-search-gallery'
                      style={{ 'margin-top': this.state.margin }}
                    >
                      {this.state.showImage ? (
                        <section className='section'>
                          <h2 className='section-title'>
                            Search Result Images
                          </h2>

                          <div className='cocktails-center'>
                            {Images.map((item) => {
                              return (
                                <article className='cocktail'>
                                  <div className='img-container'>
                                    <button
                                      onClick={() => {
                                        axios({
                                          url: 'http://localhost:5000/' + item,
                                          method: 'GET',
                                          responseType: 'blob', // important
                                        }).then((response) => {
                                          const url = window.URL.createObjectURL(
                                            new Blob([response.data])
                                          );
                                          const link = document.createElement(
                                            'a'
                                          );
                                          link.href = url;
                                          link.setAttribute(
                                            'download',
                                            'file.jpg'
                                          );
                                          document.body.appendChild(link);
                                          link.click();
                                        });
                                      }}
                                    >
                                      <img
                                        src={'http://localhost:5000/' + item}
                                        alt='#'
                                      />
                                    </button>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                          {Images.length < this.state.top ? (
                            <p>
                              **Sorry only {Images.length} of {this.state.top}{' '}
                              matches found.
                            </p>
                          ) : (
                            ''
                          )}
                        </section>
                      ) : (
                        <form
                          className='section'
                          stylr={{ 'margin-top': this.state.margin }}
                        >
                          {this.state.url_image ? (
                            <>
                              <div
                                style={{
                                  'margin-left': '20%',
                                  width: '50%',
                                  height: '50%',
                                }}
                              >
                                <p className='section-title'>Uploaded Image</p>
                                <img src={this.state.url_image} alt='' $ />
                              </div>
                            </>
                          ) : (
                            ''
                          )}
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      );
    } catch (error) {
      console.log(error);
      return (
        <h1>
          <br />
          <br />
          <div className='jumbotron'>
            <div className='section-title'>
              Please Go Back and Upload Image...
            </div>
          </div>
        </h1>
      );
    }
  }
}

export default MyForm;
