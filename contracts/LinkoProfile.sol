// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title LinkoProfile
 * @dev Store and retrieve IPFS CIDs for user profiles on Base network
 */
contract LinkoProfile {
    // Mapping from wallet address to IPFS CID
    mapping(address => string) public profileCIDs;
    
    // Events
    event ProfileUpdated(address indexed user, string ipfsCID);
    
    /**
     * @dev Set the IPFS CID for the caller's profile
     * @param _ipfsCID The IPFS CID hash pointing to the user's profile data
     */
    function setProfileCID(string memory _ipfsCID) public {
        require(bytes(_ipfsCID).length > 0, "IPFS CID cannot be empty");
        profileCIDs[msg.sender] = _ipfsCID;
        emit ProfileUpdated(msg.sender, _ipfsCID);
    }
    
    /**
     * @dev Get the IPFS CID for a specific user's profile
     * @param _user The wallet address of the user
     * @return The IPFS CID hash for the user's profile
     */
    function getProfileCID(address _user) public view returns (string memory) {
        return profileCIDs[_user];
    }
    
    /**
     * @dev Get the IPFS CID for the caller's profile
     * @return The IPFS CID hash for the caller's profile
     */
    function getMyProfileCID() public view returns (string memory) {
        return profileCIDs[msg.sender];
    }
    
    /**
     * @dev Check if a user has set a profile CID
     * @param _user The wallet address to check
     * @return True if the user has a profile CID set
     */
    function hasProfile(address _user) public view returns (bool) {
        return bytes(profileCIDs[_user]).length > 0;
    }
}
