// ./test/DSCSA.test.js
// Load dependencies
const { constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect, assert } = require('chai');

// Load compiled artifacts
const DSCSA = artifacts.require('DSCSA');
var Web3 = require('web3');

// Start test block
contract('DSCSA', function () {
  beforeEach(async function () {
    // Deploy a new DSCSA contract for each test
    this.DSCSA = await DSCSA.new();
  });

  // Test case
  describe('Setters and Getters', function () {
    // Set Test Variables
    var testHolderAddress; 
    var testGlobalTradeItemNumber = 855245005019;
    var testExpirationDate;
    var testLot = Web3.toAscii("0x657468657265756d000000000000000000000000000000000000000000000000");
    var testSerialNumber = 477018182632;
    
    let date = (new Date(2025, 0, 1)).getTime();
    testExpirationDate = date / 1000;

    it('sets values', async function () {
      testHolderAddress = await this.DSCSA.owner()
      await this.DSCSA.store(testHolderAddress, testGlobalTradeItemNumber, testExpirationDate, testLot, testSerialNumber);
      assert(await this.DSCSA.owner() > 0, 'owner is empty');
    });

    it('gets values', async function () {
      const result = await this.DSCSA.retrieve();
      console.log('result[holderAddress]: ' + result[holderAddress]);
      console.log('result[1]: ' + result[1]);
      console.log('result[2]: ' + result[2]);
      console.log('result[3]: ' + result[3]);
      console.log('result[4]: ' + result[4]);

      const {0: rtnHolderAddress, 1: rtnGlobalTradeItemNumber, 2: rtnExpirationDate, 3: rtnLot, 4: rtnSerialNumber} = result;

      console.log('testHolderAddress: ' + testHolderAddress); 
      console.log('testGlobalTradeItemNumber: ' + testGlobalTradeItemNumber); 
      console.log('testExpirationDate: ' + testExpirationDate); 
      console.log('testLot: ' + testLot); 
      console.log('testSerialNumber: ' + testSerialNumber); 

      console.log('rtnHolderAddress: ' + rtnHolderAddress); 
      console.log('rtnGlobalTradeItemNumber: ' + rtnGlobalTradeItemNumber); 
      console.log('rtnExpirationDate: ' + rtnExpirationDate); 
      console.log('rtnLot: ' + rtnLot); 
      console.log('rtnSerialNumber: ' + rtnSerialNumber); 

      assert(rtnHolderAddress == testHolderAddress, 'holder addresses different than set');

    });
  });

});