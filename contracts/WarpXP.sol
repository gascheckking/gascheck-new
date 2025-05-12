// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WarpXP {
    mapping(address => uint256) public xp;
    mapping(address => bool) public premiumMembers;

    event XPEarned(address user, uint256 amount);
    event PremiumPurchased(address user);

    function earnXP(uint256 _amount) external {
        xp[msg.sender] += _amount;
        emit XPEarned(msg.sender, _amount);
    }

    function buyPremium() external payable {
        require(msg.value == 0.009 ether, "Fel belopp");
        premiumMembers[msg.sender] = true;
        emit PremiumPurchased(msg.sender);
    }
}
