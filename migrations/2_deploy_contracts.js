const ChimayToken = artifacts.require("ChimayToken");

module.exports = function(deployer) {
  deployer.deploy(ChimayToken);
};
