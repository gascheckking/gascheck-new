// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WarpPoints {
    mapping(address => uint256) public pointsBalance;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mintPoints(address _user, uint256 _amount) external {
        require(msg.sender == owner, "Endast ägare");
        pointsBalance[_user] += _amount;
    }

    function transferPoints(address _to, uint256 _amount) external {
        require(pointsBalance[msg.sender] >= _amount, "För lite poäng");
        pointsBalance[msg.sender] -= _amount;
        pointsBalance[_to] += _amount;
    }
}
