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
      keyword: true,
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
      margin: '100%',
    });
  }
  changeTypeImage() {
    this.setState({
      advanced: true,
      keyword: false,
      showImage: false,
      key_color: black,
      adv_color: orange,
      margin: '100%',
    });
  }
  setTop = (event) => {
    this.setState({ top: event.target.value });
  };

  render() {
    try {
      return (
        <>
          <div className='background-login'>
            <Navbar />
            <div
              style={{
                width: '60%',
                'margin-left': '25%',
                'margin-top': '8%',
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
                      width: 'fit-content',

                      'border-radius': '8px',
                      display: 'flex',
                      'align-items': 'center',
                    }}
                  >
                    <button
                      className='btn btn-warning '
                      onClick={this.changeTypeKeyword}
                      style={{
                        'background-color': this.state.key_color,
                        border: 'none',
                        font: ' 17px/35px Roboto',
                        color: white,
                      }}
                    >
                      Text Search
                    </button>

                    <button
                      className='btn btn-warning '
                      onClick={this.changeTypeImage}
                      style={{
                        'background-color': this.state.adv_color,
                        font: '  17px/35px Roboto',
                        border: 'none',

                        color: white,
                      }}
                    >
                      Cognitive Search
                    </button>
                    <div
                      style={{
                        height: '50px',
                        width: '500px',
                        backgroundColor: 'black',
                        borderRadius: '0px 70px 0px 0px',
                      }}
                    ></div>
                  </div>
                </section>
              </form>
            </div>

            {
              <>
                <div className='box-fa'>
                  {this.state.keyword}
                  {this.state.keyword && (
                    <div>
                      <div>
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
                              width: '57%',
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
                              width: '27%',
                              height: '7%',
                              padding: '1.5%',
                              font: 'normal normal normal 13px/35px Roboto',
                            }}
                          />
                          &nbsp; &nbsp;
                          <img
                            src={srch}
                            alt='#'
                            onClick={this.submitSearch}
                            style={{
                              borderRadius: '50%',
                              cursor: 'pointer',
                              marginLeft: '90%',
                              marginTop: '-6%',
                              width: '6%',
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
                      <div style={{ position: 'flex-start' }}>
                        <input
                          type='text'
                          name='name'
                          placeholder='Start typing to search here!'
                          onChange={this.myChangeHandler}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #B9B9B9',
                            borderRadius: '12px',
                            width: '47%',
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
                            width: '23%',
                            height: '7%',
                            padding: '1.5%',
                            font: 'normal normal normal 13px/35px Roboto',
                          }}
                        />
                        &nbsp; &nbsp;
                        <input
                          type='file'
                          id='sel1'
                          name='name'
                          onChange={this.searchImage}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #B9B9B9',
                            borderRadius: '12px',
                            width: '17%',
                            height: '7%',
                            padding: '1.5%',
                            font: 'normal normal normal 13px/35px Roboto',
                          }}
                        />
                        &nbsp; &nbsp;
                        <img
                          src={srch}
                          alt='#'
                          onClick={this.searchByImage}
                          style={{
                            borderRadius: '50%',
                            cursor: 'pointer',
                            marginLeft: '93%',
                            marginTop: '-8%',
                            width: '6%',
                          }}
                        />
                      </div>
                    </form>
                  )}
                </div>
                <div>
                  {(this.state.showImage || this.state.url_image) && (
                    <div className='box-search-gallery'>
                      {this.state.showImage ? (
                        <section className='section'>
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
                        <form className='section'>
                          {this.state.url_image ? (
                            <>
                              <div
                                style={{
                                  'margin-left': '20%',
                                  width: '50%',
                                  height: '50%',
                                }}
                              >
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
            }
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
