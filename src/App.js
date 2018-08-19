import React, { Component } from 'react'
import BlockchainForPeaceContract from '../build/contracts/BlockchainForPeace.json' 
import getWeb3 from './utils/getWeb3'
import SimpleTable from './table/SimpleTable'
import CustomizedInputs from './TextFields/CustomizedInputs'

import 'bulma/css/bulma.css';
import NavBar from './components/NavBar.js';
import DonationInputs from './components/DonationInputs.js';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const contract = require('truffle-contract')
const BlockchainForPeace = contract(BlockchainForPeaceContract)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      account: null,
      BlockchainForPeaceInstance: null,
    }
    this.createMessage = this.createMessage.bind(this)
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract = async () => {
    this.getActiveMetaMaskAccount();

    BlockchainForPeace.setProvider(this.state.web3.currentProvider)
    const BlockchainForPeaceInstance = await BlockchainForPeace.deployed()
    return this.setState({ BlockchainForPeaceInstance }, () => {
      //Once the App State is set, I run a check to see if active MetaMask account changed - setInterval Method suggested by MetaMask FAQ https://tinyurl.com/ycokp3h6
      setInterval(() => {
        getWeb3.then( obj => {
         if (obj.web3.eth.accounts[0] !== this.state.account) location.reload()
        })
      }, 100); 
    })
  }


  getActiveMetaMaskAccount = () => {
    this.state.web3.eth.getAccounts( (err, accounts) => {
        this.setState({ account : accounts[0]})
    })
}

  createMessage = (message, ethValue) => {
    this.state.BlockchainForPeaceInstance.messageForPeace(message, { from: this.state.account, value: ethValue})
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        <br />
        <div className='container'>
          <DonationInputs createMessage={this.createMessage} />
        </div>


        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
                <SimpleTable />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
