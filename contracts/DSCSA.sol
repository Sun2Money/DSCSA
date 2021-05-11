// contracts/DSCSA.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

// Import Ownable->Context from the OpenZeppelin Contracts library
import "node_modules/@openzeppelin/contracts/utils/Context.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @title  FDA DSCSA Blockchain Example
/// @author Tracy Sanders
/// @notice You can use this contract for only the most basic simulation
/// @dev    A simple example of a Blockchain inheriting Ownable, MAH in this problem domin
contract DSCSA is Ownable {
    address internal  holderAddress; 
    uint    internal  globalTradeItemNumber;
    uint    internal  expirationDate;
    string  internal  lot;
    uint    internal  serialNumber;

    // The onlyOwner modifier restricts who can call the store function
    /// @param newHolderAddress         Trading partner in possession of drug
    /// @param newGlobalTradeItemNumber Unique ID
    /// @param newExpirationDate        Product Expiration Date
    /// @param newLot                   Product Lot (batch)
    /// @param newSerialNumber          Package Serrial Number

    function store(
        address newHolderAddress,
        uint newGlobalTradeItemNumber,
        uint newExpirationDate,
        string memory newLot,
        uint newSerialNumber
    )
        public onlyOwner
    {
        holderAddress           = newHolderAddress;
        globalTradeItemNumber   = newGlobalTradeItemNumber;
        expirationDate          = newExpirationDate;
        lot                     = newLot;
        serialNumber            = newSerialNumber;
    }

    function retrieve() public view returns (address, uint, uint, string memory, uint)
    {
        return (holderAddress, globalTradeItemNumber, expirationDate, lot, serialNumber);
    }

    ///--------------------------------------------------------------------------------
    /// @dev Stores HolderAddress which is the Trading partner in possession of drug
    /// @param newHolderAddress Trading partner in possession of drug
    function setHolderAddress(address newHolderAddress) public onlyOwner
    {
        holderAddress = newHolderAddress;
    }   
    
    /// @dev Returns HolderAddress which is the Trading partner in possession of drug
    function getHolderAddress() public view returns (address) 
    {
        return holderAddress;
    }        

    ///--------------------------------------------------------------------------------
    /// @dev Stores GlobalTradeItemNumber which is a Unique ID
    /// @param newGlobalTradeItemNumber Unique ID
    function setGlobalTradeItemNumber(uint newGlobalTradeItemNumber) public onlyOwner
    {
        globalTradeItemNumber = newGlobalTradeItemNumber;
    }   
    
    /// @dev Returns GlobalTradeItemNumber 
    function getGlobalTradeItemNumber() public view returns (uint) 
    {
        return globalTradeItemNumber;
    }       

    ///--------------------------------------------------------------------------------
    /// @dev Stores ExpirationDate 
    /// @param newExpirationDate Date package expires
    function setExpirationDate(uint newExpirationDate) public onlyOwner
    {
        expirationDate = newExpirationDate;
    }   
    
    /// @dev Returns ExpirationDate which is the date the drug will expire
    function getExpirationDate() public view returns (uint) 
    {
        return expirationDate;
    }       

    //                             = newLot;
    ///--------------------------------------------------------------------------------
    /// @dev Stores lot 
    /// @param newLot lot that drug was made in
    function setLot(string memory newLot) public onlyOwner
    {
        lot = newLot;
    }   
    
    /// @dev Returns lot that drug was made in
    function getLot() public view returns (string memory) 
    {
        return lot;
    }       


    ///--------------------------------------------------------------------------------
    /// @dev Stores SerialNumber which is a Universal Unique ID (UUID)
    /// @param newSerialNumber Unique ID
    function setSerialNumber(uint newSerialNumber) public onlyOwner
    {
        serialNumber = newSerialNumber;
    }   
    
    /// @dev Returns SerialNumber which is the UUID of the drug package
    function getSerialNumber() public view returns (uint) 
    {
        return serialNumber;
    }       

}