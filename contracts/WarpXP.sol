// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WarpXP {
    address public owner;
    mapping(address => uint256) public xp;
    mapping(address => uint256) public lastClaim;

    event XPClaimed(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function claimDaily() external {
        require(block.timestamp > lastClaim[msg.sender] + 1 days, "Already claimed today");
        xp[msg.sender] += 100;
        lastClaim[msg.sender] = block.timestamp;
        emit XPClaimed(msg.sender, 100);
    }

    function getXP(address user) external view returns (uint256) {
        return xp[user];
    }

    function adminSetXP(address user, uint256 amount) external onlyOwner {
        xp[user] = amount;
    }
}