// migrations/2_deploy.js
const DSCSA = artifacts.require("DSCSA");

module.exports = async function (deployer) {
  await deployer.deploy(DSCSA);
};