// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProofAnchor {
    // Mapping from proofId to 0G Storage CID
    mapping(string => string) public proofs;

    event ProofStored(string indexed proofId, string storageCID, uint256 timestamp);

    function storeProof(string memory proofId, string memory storageCID) public {
        require(bytes(proofs[proofId]).length == 0, "Proof already exists");
        proofs[proofId] = storageCID;
        emit ProofStored(proofId, storageCID, block.timestamp);
    }

    function getProof(string memory proofId) public view returns (string memory) {
        return proofs[proofId];
    }
}
