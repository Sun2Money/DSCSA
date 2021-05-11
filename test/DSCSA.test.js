// ./test/DSCSA.test.js
// Load dependencies
//const { accounts, contract } = require('@openzeppelin/test-environment');
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect, assert } = require('chai');

// Load compiled artifacts
const DSCSA = artifacts.require('DSCSA');

// Start test block: lot = 'xyz123' (maximum is 20 characters)
contract('DSCSA', function () {
    // Set Test Variables
    var testHolderAddress; 
    var testGlobalTradeItemNumber = 855245005019;
    var testExpirationDate;
    var testLot = new BN(0x78797a313233, 16);
    var testSerialNumber = 477018182632;
    
    let date = (new Date(2025, 0, 1)).getTime();
    testExpirationDate = date / 1000;

    //var rtnHolderAddress;

  beforeEach(async function () {
    // Deploy a new DSCSA contract for each test
    this.DSCSA = await DSCSA.new();
  });

  it('set/get holderAddress', async function () {
    testHolderAddress = await this.DSCSA.owner();
    this.DSCSA.setHolderAddress(testHolderAddress);
    assert( testHolderAddress > 0, 'owner is not empty');

    let rtnHolderAddress = await this.DSCSA.getHolderAddress();
    assert( testHolderAddress == rtnHolderAddress, 'holder != set');    
  });

  it('set/get globalTradeItemNumber', async function () {
    this.DSCSA.setGlobalTradeItemNumber(testGlobalTradeItemNumber);
    let rtnGlobalTradeItemNumber = await this.DSCSA.getGlobalTradeItemNumber();
    assert( testGlobalTradeItemNumber == rtnGlobalTradeItemNumber, 'globalTradeItemNumber != set');    
  });

  it('set/get expirationDate', async function () {
    this.DSCSA.setExpirationDate(testExpirationDate);
    let rtnExpirationDate = await this.DSCSA.getExpirationDate();
    assert( testExpirationDate == rtnExpirationDate, 'expirationDate != set');    
  });

  it('set/get serialNumber', async function () {
    this.DSCSA.setSerialNumber(testSerialNumber);
    let rtnSerialNumber = await this.DSCSA.getSerialNumber();
    assert( testSerialNumber == rtnSerialNumber, 'lot != set');    
  });
  
  it('set/get lot', async function () {
    let byteLength = testLot.byteLength();
    console.log('\n');
    console.log('testLot.toString(10): ' + testLot.toString(10, byteLength));
    console.log('testLot.toString(16): ' + testLot.toString(16, byteLength));
    console.log('testLot.byteLength(): ' + byteLength);
    console.log('\n');

    await this.DSCSA.setLot(testLot.toArray('le', 20));
    let rtnLot = await this.DSCSA.getLot();
    assert( testLot == rtnLot, 'lot != set');    
  });   

});