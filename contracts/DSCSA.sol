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
    uint    internal  holderAddress; 
    uint    internal  globalTradeItemNumber;
    uint    internal  expirationDate;
    bytes32 internal  lot;
    uint    internal  serialNumber;

    // The onlyOwner modifier restricts who can call the store function
    /// @param newHolderAddress         Trading partner in possession of drug
    /// @param newGlobalTradeItemNumber Unique ID
    /// @param newExpirationDate        Product Expiration Date
    /// @param newLot                   Product Lot (batch)
    /// @param newSerialNumber          Package Serrial Number

    function store(
        uint newHolderAddress,
        uint newGlobalTradeItemNumber,
        uint newExpirationDate,
        bytes32 newLot,
        uint newSerialNumber
    )
        public
    {
        holderAddress           = newHolderAddress;
        globalTradeItemNumber   = newGlobalTradeItemNumber;
        expirationDate          = newExpirationDate;
        lot                     = newLot;
        serialNumber            = newSerialNumber;
    }

    function retrieve() external view returns (uint, uint, uint, bytes32, uint)
    {
        return (holderAddress, globalTradeItemNumber, expirationDate, lot, serialNumber);
    }
}