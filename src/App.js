import React, { Component } from 'react'
import BlockchainForPeaceContract from '../build/contracts/BlockchainForPeace.json' 
import getWeb3 from './utils/getWeb3'

import 'bulma/css/bulma.css';
import NavBar from './components/NavBar.js';
import DonationInputs from './components/DonationInputs.js';
import LeaderBoard from './components/LeaderBoard.js';

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
      totalNumOfDonations: 0,
      donations: [],
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
    const totalNumOfDonations = await BlockchainForPeaceInstance.getDonationLength.call()
                                            .then(result => result.toString())

    const donations = await this.getDonationList(BlockchainForPeaceInstance, totalNumOfDonations)

    return this.setState({ BlockchainForPeaceInstance, donations, totalNumOfDonations }, () => {
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

  getDonationList = async (contractInstance, numOfDonations) => {
    // fetch Donations and Rebuild Array of Donations Object/Struct
    const promiseArr = [];
  
    for (let i = 0; i < numOfDonations; i++ ) 
        { promiseArr[i] = await contractInstance.getDonation(i) }

    return promiseArr.map( ([ donorAddress, message, value ]) => ({ donorAddress, message, value: value.toString() }))
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <section className="section" >
          <div className="container" >
            <LeaderBoard donations={this.state.donations} />
          </div>
          <div className='container'>
            <DonationInputs createMessage={this.createMessage} />
          </div>
        </section>
      </div>
    );
  }
}

export default App
