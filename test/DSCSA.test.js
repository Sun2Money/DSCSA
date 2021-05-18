// Load dependencies
const { accounts } = require('@openzeppelin/test-environment');
const [ manufacturer, repackagers, distributor, wholesaler, dispensers ] = accounts;
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { expect, assert } = require('chai');

// Load compiled artifacts
const DSCSA = artifacts.require('DSCSA');

// Define Global Test Variables
var testHolderAddress; 
var testGlobalTradeItemNumber = 855245005019;
var testExpirationDate;
var testLot = 'xyz123';
var testSerialNumber = 477018182632;

// Set global variables
let date = (new Date(2025, 0, 1)).getTime();
testExpirationDate = date / 1000;

//-----------------------------------------------------------------------------
// set/get tests : Assign contract property and retrieve to test
// store/retrieve: Assign all contract properties and read to test
//-----------------------------------------------------------------------------
contract('dscsa set/get tests', function () {

  // Deploy a new DSCSA contract for each test
  beforeEach(async function () {
    this.DSCSA = await DSCSA.new();
  });

  it('set/get holderAddress', async function () {
    testHolderAddress = await this.DSCSA.owner();

    assert( testHolderAddress > 0, 'owner is not empty');

    await this.DSCSA.setHolderAddress(testHolderAddress);
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

//-----------------------------------------------------------------------------
// Simple scenario where the MAH logs all data for DSCSA from internal systems
//-----------------------------------------------------------------------------
contract('dscsa MAH logs all supply chain activity', function () {

  beforeEach(async function () {
    this.DSCSA = await DSCSA.new();
  });

  it('Owner (MAH) documents supply chain activity', async function () {
    // owner == manufacturer
    testHolderAddress = await this.DSCSA.owner();
    await this.DSCSA.store(testHolderAddress, testGlobalTradeItemNumber, testExpirationDate, testLot, testSerialNumber);  

    // set to repackagers
    await this.DSCSA.setHolderAddress(repackagers);
    let rtnAddress = await this.DSCSA.getHolderAddress();

    assert( repackagers == rtnAddress, 'holder != repackagers'); 

    // set to distributor
    await this.DSCSA.setHolderAddress(distributor);
    rtnAddress = await this.DSCSA.getHolderAddress();

    assert( distributor == rtnAddress, 'holder != distributor'); 

    // set to wholesaler
    await this.DSCSA.setHolderAddress(wholesaler);
    rtnAddress = await this.DSCSA.getHolderAddress();

    assert( wholesaler == rtnAddress, 'holder != wholesaler');    

    // set to dispensers
    await this.DSCSA.setHolderAddress(dispensers);
    rtnAddress = await this.DSCSA.getHolderAddress();

    assert( dispensers == rtnAddress, 'holder != dispensers');
  });  

});