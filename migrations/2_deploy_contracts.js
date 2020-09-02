const ChimayToken = artifacts.require("ChimayToken");	// contract abstraction

module.exports = function(deployer) {
  deployer.deploy(ChimayToken, 1000000);
};
