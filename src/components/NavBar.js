import React, { Component } from 'react';
import 'bulma/css/bulma.css';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {

    return (
      <nav className="navbar is-fixed-top level" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">





          <a className='navbar-item' href="https://benjirichards.com">
            <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="224" height="56" />
          </a>





          
        </div>   

        <div id="navbarExampleTransparentExample" className='navbar-menu'>
          <div className="navbar-start">

            <a to='/auditsLanding' className='navbar-item'>
              About
            </a>

            <a to='/hackathons' className='navbar-item'>
              Stuff
            </a>

          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                
                <p className="control">
                  <a className="button is-info is-outlined" href='https://bountyone.io/aboutaudits'>
                    <span>
                      About Jesse
                    </span>
                  </a>
                </p>
                
                <p className="control">
                  <a className="button is-info" href='https://bountyone.io/auditsapply'>
                    <span>
                      Don't CLICK D:
                    </span>
                  </a>
                </p>

              </div>
            </div>
          </div>
        </div>   
      </nav>
    );
  }
}

export default NavBar;
