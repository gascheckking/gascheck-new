// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WarpPoints {
    address public owner;
    mapping(address => uint256) public balanceOf;

    event PointsAwarded(address indexed user, uint256 amount);
    event PointsSpent(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function awardPoints(address user, uint256 amount) external onlyOwner {
        balanceOf[user] += amount;
        emit PointsAwarded(user, amount);
    }

    function spendPoints(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "Not enough WP");
        balanceOf[msg.sender] -= amount;
        emit PointsSpent(msg.sender, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        return balanceOf[user];
    }
}