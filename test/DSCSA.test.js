// ./test/DSCSA.test.js
// Load dependencies
const { constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect } = require('chai');

// Load compiled artifacts
const DSCSA = artifacts.require('DSCSA');

// Start test block
contract('DSCSA', function () {
  beforeEach(async function () {
    // Deploy a new DSCSA contract for each test
    this.DSCSA = await DSCSA.new();
  });

  // Test case
  describe('Setters and Getters', function () {
    it('retrieve returns a value previously stored', async function () {
      // Store values
      let date = (new Date()).getTime();
      let expirationDateInUnixTimestamp = date / 1000;
      await this.DSCSA.store(42, 42, expirationDateInUnixTimestamp, 42, 42);
  
      // Test if the returned value is the same one
      // Note that we need to use strings to compare the 256 bit integers
      expect((await this.DSCSA.retrieve()).toString()).to.equal('42');
    });
  });

});