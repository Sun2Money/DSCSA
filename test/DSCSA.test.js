// ./test/DSCSA.test.js
// Load dependencies
const { constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect, assert } = require('chai');

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
    // Set Test Variables
    var testHolderAddress = this.DSCSA.Owner(); 
    var testGlobalTradeItemNumber = 855245005019;
    var testExpirationDate;
    var testLot = 123; //'xyz123'
    var testSerialNumber = 477018182632;
    
    let date = (new Date(2025, 0, 1)).getTime();
    let testExpirationDate = date / 1000;

    it('sets values', async function () {
      await this.DSCSA.store(testHolderAddress, testGlobalTradeItemNumber, testExpirationDate, testLot, testSerialNumber);
      assert(await this.DSCSA.Owner()>0, 'owner is empty');
    });

    it('gets values', async function () {
      const result = await this.DSCSA.retrieve();
      const {0: rtnHolderAddress, 1: rtnGlobalTradeItemNumber, 2: rtnExpirationDate, 3: rtnLot, 4: rtnSerialNumber} = result;

      console.log('rtnHolderAddress: ' + str(rtnHolderAddress)); 
      assert(rtnHolderAddress=testHolderAddress, 'holder addresses different than set');

    });
  });

});