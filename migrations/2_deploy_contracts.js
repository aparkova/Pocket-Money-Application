var PmToken = artifacts.require("./PmToken");
var Storage = artifacts.require("./Storage");
var CodeStorage = artifacts.require("./CodeStorage");

module.exports = function(deployer) {
  deployer.deploy(PmToken);
  deployer.deploy(Storage);
  deployer.deploy(CodeStorage);
};