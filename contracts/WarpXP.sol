// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WarpXP {
    mapping(address => uint256) public xp;
    mapping(address => bool) public premiumUsers;
    
    function claimDaily() external {
        xp[msg.sender] += 100;
    }

    function checkPremiumAccess() external view returns (bool) {
        return premiumUsers[msg.sender];
    }

    function purchasePremium() external payable {
        require(msg.value == 0.009 ether, "Incorrect ETH amount");
        premiumUsers[msg.sender] = true;
    }
}
