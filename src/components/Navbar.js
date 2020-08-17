import React from 'react';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router-dom';
import Icon1 from '../img/Icon1.png';
import Icon2 from '../img/Icon2.png';
import Icon3 from '../img/Icon3.png';
import Icon4 from '../img/Icon4.png';
import Icon5 from '../img/Icon5.png';
import Icon6 from '../img/Icon6.png';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      width: '4%',
    };
  }

  render() {
    return (
      <Sidebar>
        <>
          <div
            class='w3-sidebar w3-bar-block'
            onMouseOver={() =>
              this.setState({ sidebarOpen: true, width: '16%' })
            }
            onMouseOut={() =>
              this.setState({ sidebarOpen: false, width: '5%' })
            }
            style={{
              width: this.state.width,
              background: 'linear-gradient(orange,red)',
              height: '100%',
              position: 'fixed',
            }}
          >
            <ul>
              <Link>
                <li style={{ marginLeft: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {this.state.sidebarOpen ? (
                      <>
                        <img
                          src={Icon1}
                          style={{
                            width: '20%',

                            position: 'absolute',
                            top: '5%',
                            left: '10%',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '3%',
                            left: '30%',
                            'font-size': '10px',
                            marginTop: '10px',
                          }}
                        >
                          <h5> Cognitive Engineering Data Extractor</h5>
                        </div>
                      </>
                    ) : (
                      <img
                        src={Icon1}
                        style={{
                          width: '50%',
                          position: 'absolute',
                          top: '5%',
                          left: '20%',
                        }}
                      />
                    )}
                  </div>
                </li>
              </Link>

              {this.state.sidebarOpen ? (
                <div
                  style={{
                    'background-color': 'orangered',
                    height: '7px',
                    marginTop: '65%',
                  }}
                ></div>
              ) : (
                ''
              )}

              <Link to='/hero'>
                <li style={{ marginTop: '10%', marginLeft: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {this.state.sidebarOpen ? (
                      <>
                        <img
                          src={Icon2}
                          style={{
                            width: '20%',

                            position: 'absolute',
                            top: '25%',
                            left: '8%',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '25%',
                            left: '30%',
                            'font-size': '10px',
                            marginTop: '10px',
                          }}
                        >
                          <h5> Home</h5>
                        </div>
                      </>
                    ) : (
                      <img
                        src={Icon2}
                        style={{
                          width: '50%',
                          position: 'absolute',
                          top: '25%',
                          left: '30%',
                          marginTop: '10px',
                        }}
                      />
                    )}
                  </div>
                </li>
              </Link>
              <br></br>
              <Link to='/read'>
                <li style={{ marginTop: '10%', marginLeft: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {this.state.sidebarOpen ? (
                      <>
                        <img
                          src={Icon3}
                          style={{
                            width: '20%',

                            position: 'absolute',
                            top: '35%',
                            left: '10%',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '35%',
                            left: '30%',
                            'font-size': '10px',
                            marginTop: '10px',
                          }}
                        >
                          <h5> Upload </h5>
                        </div>
                      </>
                    ) : (
                      <img
                        src={Icon3}
                        style={{
                          width: '50%',
                          position: 'absolute',
                          top: '35%',
                          left: '30%',
                          marginTop: '10px',
                        }}
                      />
                    )}
                  </div>
                </li>
              </Link>

              <br></br>
              <Link to='/search'>
                <li style={{ marginTop: '95%', marginLeft: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {this.state.sidebarOpen ? (
                      <>
                        <img
                          src={Icon4}
                          style={{
                            width: '20%',
                            position: 'absolute',
                            top: '45%',
                            left: '10%',
                          }}
                        ></img>
                        <div
                          style={{
                            position: 'absolute',
                            top: '45%',
                            left: '30%',
                            'font-size': '10px',
                            marginTop: '10px',
                          }}
                        >
                          <h5> Search </h5>
                        </div>
                      </>
                    ) : (
                      <img
                        src={Icon4}
                        style={{
                          width: '50%',
                          position: 'absolute',
                          top: '45%',
                          left: '30%',
                          marginTop: '10px',
                        }}
                      />
                    )}
                  </div>
                </li>
              </Link>
              <br></br>

              <Link to='/register'>
                <li style={{ marginTop: '100%', marginLeft: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {this.state.sidebarOpen ? (
                      <>
                        <img
                          src={Icon5}
                          style={{
                            width: '20%',
                            position: 'absolute',
                            top: '75%',
                            left: '10%',
                          }}
                        ></img>
                        <div
                          style={{
                            position: 'absolute',
                            top: '75%',
                            left: '30%',
                            'font-size': '10px',
                            marginTop: '10px',
                          }}
                        >
                          <h5> Add User </h5>
                        </div>
                      </>
                    ) : (
                      <img
                        src={Icon5}
                        style={{
                          width: '50%',
                          fontSize: '300%',
                          position: 'absolute',
                          top: '75%',
                          left: '15%',
                        }}
                      />
                    )}
                  </div>
                </li>
              </Link>

              <br></br>
              <Link to='/'>
                <li style={{ marginTop: '100%', marginLeft: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {this.state.sidebarOpen ? (
                      <>
                        <img
                          src={Icon6}
                          style={{
                            width: '20%',
                            position: 'absolute',
                            top: '85%',
                            left: '12%',
                          }}
                        ></img>
                        <div
                          style={{
                            position: 'absolute',
                            top: '85%',
                            left: '30%',
                            'font-size': '10px',
                            marginTop: '10px',
                          }}
                        >
                          <h5> Logout </h5>
                        </div>
                      </>
                    ) : (
                      <img
                        src={Icon6}
                        style={{
                          width: '50%',
                          fontSize: '300%',
                          position: 'absolute',
                          top: '85%',
                          left: '20%',
                        }}
                      />
                    )}
                  </div>
                </li>
              </Link>
            </ul>
          </div>
        </>
      </Sidebar>
    );
  }
}

export default Navbar;
