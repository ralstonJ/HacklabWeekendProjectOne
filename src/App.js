import React, { Component } from 'react'
import BlockchainForPeaceContract from '../build/contracts/BlockchainForPeace.json' 
  

import getWeb3 from './utils/getWeb3'

import SimpleTable from './table/SimpleTable'
import CustomizedInputs from './TextFields/CustomizedInputs'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
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

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    //const simpleStorage = contract(SimpleStorageContract)
    const BlockchainForPeace = contract(BlockchainForPeaceContract)
    BlockchainForPeace.setProvider(this.state.web3.currentProvider)
    //simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    // var simpleStorageInstance
    var BlockchainForPeaceInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      BlockchainForPeace.deployed().then((instance) => {
        BlockchainForPeaceInstance = instance
        console.log('deployed');
      //simpleStorage.deployed().then((instance) => {
        //simpleStorageInstance = instance


        // Stores a given value, 5 by default.
       
        // Get the value from the contract to prove it worked.
        //return simpleStorageInstance.get.call(accounts[0])
   //  }).then((result) => {
        // Update state with the result.
       // return this.setState({ storageValue: result.c[0] })
     })
    })
  }
  _onClick = () => {
    console.log('click');

  }
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Blockchain For Peace</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
                
                <CustomizedInputs />
                <button onClick={this._onClick}>
                Donate
                </button>

                <SimpleTable />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
