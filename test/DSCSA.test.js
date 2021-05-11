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
    // Set Test Variables
    var testHolderAddress; 
    var testGlobalTradeItemNumber;
    var testExpirationDate;
    var testLotNumber;
    var testSerialNumber;
    
    it('retrieve returns a value previously stored', async function () {


      // Store values
      let date = (new Date(2025, 0, 1)).getTime();
      let expirationDateInUnixTimestamp = date / 1000;
      

      await this.DSCSA.store(42, 42, expirationDateInUnixTimestamp, 42, 42);
  
      // Test if the returned value is the same one
      // Note that we need to use strings to compare the 256 bit integers
      const result = await this.DSCSA.retrieve();
      const {0: strValue, 1: boolValue, 2: intValue} = result;

      console.log(strValue); // "data"
      console.log(boolValue); // true
      console.log(intValue); // 15


    });
  });

});