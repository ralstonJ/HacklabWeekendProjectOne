import React, { Component } from 'react';


class DonationInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethValue: 0,
      message: '',
      messageLength: 0,
    }
  }

  handleValueChange = (e) => {
    this.setState({
      ethValue: e.target.value
    });
  }

  handleMessageChange = (e) => {
    if (e.target.value.length < 800) {
      this.setState({
        message: e.target.value,
        messageLength: e.target.value.length,
      });
    }
  }

  handleDonationSubmit = (e) => {



    //SEND SUBMITION TO BLOCKCHAIN HERE



    e.preventDefault();
  }
  
  render() {

    return (
      <form className="field"
        onSubmit={this.handleDonationSubmit}>
        <div className="columns">
          <div className='column'>
            <div className="label level">Value: </div>
            <div className="control has-icons-left">
              <input className="input"
                type="text"
                placeholder="Value in Ether"
                maxLength="10"
                onChange={this.handleValueChange} />
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label level">
            Message:
         <p className="help is-info">{800 - this.state.messageLength} Char Left</p>
          </label>
          <div className="control has-icons-left">
            <textarea className="textarea"
              type="text"
              placeholder="What message would you like to be posted to the blockchain forever..."
              maxLength="800"
              onChange={this.handleMessageChange} />
          </div>
        </div>

        {/* <div className='columns level'>
          {this.state.notFilledOut &&
            <p className="help is-danger">
              Please complete sections
            </p>
          }
        </div> */}

      </form>
    );
  }
}

export default DonationInputs;