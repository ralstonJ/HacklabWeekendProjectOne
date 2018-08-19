pragma solidity ^0.4.24;

contract BlockchainForPeace {
    

    // to see the total raised 
    uint public raised;
    address public charity; 
    
    //struct for the donation 
    struct Donation {
        string message; 
        uint value; 
    }
    //mapping an address to the donation struct 
    mapping (address => Donation) public donors;
    event Donate(address indexed from, uint amount, string message);
    
    //constructor to initiate the address of the charity being donated to
    constructor () public {
        charity = msg.sender;
    }
   
    // payable function which auto transfers money to charity address, collects the value and increases the total value counter.
    function fallback() payable public {
        donors[msg.sender].value = msg.value; 
        raised += msg.value;
        charity.transfer(msg.value);
    }
    // optional message to be sent with donation, peace message.
    function messageForPeace(string _message) payable public {
        donors[msg.sender].value += msg.value;
        require(donors[msg.sender].value != 0);
        donors[msg.sender].message = _message;
        charity.transfer(msg.value);
        raised += msg.value;
        emit Donate(msg.sender, msg.value, _message);
    }
    
}