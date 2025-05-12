// contracts/WarpXP.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WarpXP {
    mapping(address => uint256) public xp;
    mapping(address => uint256) public lastClaim;

    event ClaimedXP(address indexed user, uint256 amount);

    function claimDaily() external {
        require(block.timestamp > lastClaim[msg.sender] + 1 days, "Wait 24h");
        xp[msg.sender] += 100;
        lastClaim[msg.sender] = block.timestamp;
        emit ClaimedXP(msg.sender, 100);
    }

    function getXP(address user) external view returns (uint256) {
        return xp[user];
    }
}