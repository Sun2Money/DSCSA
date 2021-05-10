// contracts/DSCSA.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

// Import Ownable from the OpenZeppelin Contracts library
import "node_modules/@openzeppelin/contracts/utils/Context.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @title  FDA DSCSA Blockchain Example
/// @author Tracy Sanders
/// @notice You can use this contract for only the most basic simulation
/// @dev    A simple example of a Blockchain inheriting Ownable, constructor of Ownable sets owning address
contract DSCSA is Ownable {
    uint    private ownerAddress; 
    uint    private globalTradeItemNumber;
    uint    private expirationDate;
    uint    private lotNumber;
    uint    private serialNumber;

    // The onlyOwner modifier restricts who can call the store function
    /// @param newOwnerAddress          Trading partner in possession of drug
    /// @param newGlobalTradeItemNumber Unique ID
    /// @param newExpirationDate        Product Expiration Date
    /// @param newLotNumber             Product Lot (batch) Number
    /// @param newSerialNumber          Package Serrial Number

    function store(
        uint newOwnerAddress,
        uint newGlobalTradeItemNumber,
        uint newExpirationDate,
        uint newLotNumber,
        uint newSerialNumber
    )
        public onlyOwner 
    {
        ownerAddress            = newOwnerAddress;
        globalTradeItemNumber   = newGlobalTradeItemNumber;
        expirationDate          = newExpirationDate;
        lotNumber               = newLotNumber;
        serialNumber            = newSerialNumber;
    }

    function retrieve() public view returns (uint) 
    {
        return ownerAddress;
    }
}