var BlockchainForPeace = artifacts.require("./BlockchainForPeace.sol");

module.exports = function(deployer) {
  deployer.deploy(BlockchainForPeace);
};
