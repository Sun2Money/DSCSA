// Load dependencies
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect, assert } = require('chai');

// Load compiled artifacts
const DSCSA = artifacts.require('DSCSA');

// Start test block: lot = 'xyz123' (maximum is 20 characters)
contract('dscsa set/get tests', function () {
  // Set Test Variables
  var testHolderAddress; 
  var testGlobalTradeItemNumber = 855245005019;
  var testExpirationDate;
  var testLot = 'xyz123';
  var testSerialNumber = 477018182632;
  
  let date = (new Date(2025, 0, 1)).getTime();
  testExpirationDate = date / 1000;

  beforeEach(async function () {
    // Deploy a new DSCSA contract for each test
    this.DSCSA = await DSCSA.new();
  });

  it('set/get holderAddress', async function () {
    testHolderAddress = await this.DSCSA.owner();
    await this.DSCSA.setHolderAddress(testHolderAddress);
    assert( testHolderAddress > 0, 'owner is not empty');

    let rtnHolderAddress = await this.DSCSA.getHolderAddress();
    assert( testHolderAddress == rtnHolderAddress, 'holder != set');    
  });

  it('set/get globalTradeItemNumber', async function () {
    await this.DSCSA.setGlobalTradeItemNumber(testGlobalTradeItemNumber);
    let rtnGlobalTradeItemNumber = await this.DSCSA.getGlobalTradeItemNumber();

    assert( testGlobalTradeItemNumber == rtnGlobalTradeItemNumber, 'globalTradeItemNumber != set');    
  });

  it('set/get expirationDate', async function () {
    await this.DSCSA.setExpirationDate(testExpirationDate);
    let rtnExpirationDate = await this.DSCSA.getExpirationDate();

    assert( testExpirationDate == rtnExpirationDate, 'expirationDate != set');    
  });

  it('set/get serialNumber', async function () {
    await this.DSCSA.setSerialNumber(testSerialNumber);
    let rtnSerialNumber = await this.DSCSA.getSerialNumber();

    assert( testSerialNumber == rtnSerialNumber, 'serialNumber != set');    
  });
  
  it('set/get lot', async function () {
    await this.DSCSA.setLot(testLot);
    let rtnLot = await this.DSCSA.getLot();

    assert( testLot == rtnLot, 'lot != set');    
  });   

  it('store/retrieve', async function () {
    await this.DSCSA.store(testHolderAddress, testGlobalTradeItemNumber, testExpirationDate, testLot, testSerialNumber);
    const rtnValues = await this.DSCSA.retrieve();
    const {0: rtnHolderAddress, 1: rtnGlobalTradeItemNumber, 2: rtnExpirationDate, 3: rtnLot, 4: rtnSerialNumber} = rtnValues;

    assert( testHolderAddress == rtnHolderAddress, 'holderAddress != set');
    assert( testGlobalTradeItemNumber == rtnGlobalTradeItemNumber, 'globalTradeItemNumber != set');
    assert( testExpirationDate == rtnExpirationDate, 'expirationDate != set');
    assert( testLot == rtnLot, 'lot != set');
    assert( testSerialNumber == rtnSerialNumber, 'serialNumber != set');    
  }); 

});