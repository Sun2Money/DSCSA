# FDA Drug Supply Chain Security Act (DSCSA) Blockchain Overview

The goal of this repository is to provide an example implementation of the DSCSA in Solidity/Truffle.  The DSCSA is a [FDA regulation](https://www.fda.gov/drugs/drug-supply-chain-security-act-dscsa/drug-supply-chain-security-act-law-and-policies) to track drugs through the supply chain.  The FDA completed a DSCSA blockchain pilot in 2020: [FDA Blockchain Pilot Report](https://www.ibm.com/downloads/cas/9V2LRYG5).

## [The pharmaceutical supply chain of Trading Partners](https://hbr.org/2020/05/building-a-transparent-supply-chain)

Supplier->Manufacturer->Re-packagers->Distributor->Wholesaler->Dispensers

Estimated #s:

- Manufacturers = 1,400
- Distributors  = 70
- Dispensers    = 166,000

### [Blockchain Overview](https://www.accenture.com/_acnmedia/pdf-71/accenture_blockchain_innovations_life_sciences.pdf)

"Despite the various efforts of full chain of custody systems that exist today, the fragmentation of systems between trading partners opens the risk for fraud. Blockchain technology is an ideal solution, given that no single organization is responsible for provenance. Organizations across the life sciences ecosystem benefit from having authentic product in the supply chain, ensuring brand integrity and improved patient outcomes by delivering authentic product to the patient. Blockchain enables the idea of a “digital passport” for a product, containing all relevant information for each component or ingredient, including instructions and patient adherence information from the packaging."

The DSCSA currently has an implementation due date of November 27, 2023.  I suspect it might change due to COVID-19 impacts.

## [High level Requirements](https://www.pharmexec.com/view/what-you-need-know-about-drug-supply-chain-security-act)

- The interoperable exchange of Transactional Information and Transactional Statements in a secure, electronic manner
- The interoperable verification of the Product Identifier, which includes the GTIN/NDC, serial number, lot number, and expiration date
- The interoperable tracing of Transactional Information and Transactional Statements back to the manufacturer for each saleable unit

### Transactional Information

includes the name of the product, its strength and dosage form, its National Drug Code, the container size, the number of containers, the lot number, the transaction date, the shipment date, and the name and address of the businesses from which and to which ownership is transferred. Providing Transactional Information at each change of ownership and provides requirements for trading partners in the event of a recall, or knowledge of illegitimate or counterfeit drugs.

Manufacturers and re-packagers can only sell to authorized trading partners, and the law establishes national license standards for wholesalers and third-party logistics providers. Trading partners must also verify returns before redistribution, and the law added requirements to provide for full tracing of products at the package level.

## Simple version 1 [Requirements](https://pmg-production.s3.amazonaws.com/2020/HCP/Files/HCP2018_Serialization_NODATE.pdf)

Show traceability

- OwnerAddress
- Global Trade Item Number (GTIN)
- Expiration Date (EXP)
- Lot Number (LOT)
- Serial Number (S/N)

## High level design

- Track the smallest sealable unit (package) identified by the Serial Number (S/N)
- Include composite key information (GTIN+LOT)
- Include state information (Expiration Date)
- Obfuscate additional data like Trade name into the referenced Metadata which can encrypted if desired
- Create DSCSA blockchain

Approach is based on grouping the smallest packages into groups instead of removing packages from groups(e.g. lots)

An alternative design by [Middle East Medicine](https://www.middleeastmedicalportal.com/a-blockchain-based-approach-for-drug-traceability-in-healthcare-supply-chain/) is to bundle packages by lot number and handle distribution of the packets on an existing blockchain like Ethereum.

## Installation

Reference [OpenZeppelin](https://docs.openzeppelin.com/learn/) for details in setting up your environment. This repository was built on Windows and Visual Code.  A brief summary is provided in the [installation.md](https://github.com/Sun2Money/DSCSA/blob/main/installation.md).

## Development

1. Launch Ganache to initialize local blockchain
2. npx truffle init
3. npx truffle compile ./test/DSCSA.test.sol > test.log
4. npx truffle migrate --network development
5. npx truffle test ./test/DSCSA.test.js > test.log

### Example Code

### Unit Testing

The unit tests for each function are organized as follows:

- happy cases
- trigger requires
- check modifiers
- edge cases (1 boundary)
- corner cases (n edges)

### Create Documentation

solc --userdoc --devdoc DSSCSA.sol

## Miscellaneous Notes

### NPM

- npm cache clean --force

### Logging

./test > test.log

### Windows

In your VS code powershell terminal: Set-ExecutionPolicy Unrestricted
