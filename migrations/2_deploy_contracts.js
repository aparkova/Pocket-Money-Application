var PmToken = artifacts.require("./PmToken");
var Storage = artifacts.require("./Storage");
var CodeStorage = artifacts.require("./CodeStorage");
var Test1 = artifacts.require("./Test1");

module.exports = function(deployer) {
  deployer.deploy(PmToken);
  deployer.deploy(Storage);
  deployer.deploy(CodeStorage);
  deployer.deploy(Test1);
};