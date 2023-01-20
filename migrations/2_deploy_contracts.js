// var PmToken = artifacts.require("./PmToken");
var Marketplace = artifacts.require("./Marketplace");

module.exports = function(deployer) {
  // deployer.deploy(PmToken);
  deployer.deploy(Marketplace);
};