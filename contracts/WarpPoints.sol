// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.0;  

contract WarpPoints {  
    mapping(address => uint256) public warpPoints;  

    event PointsMinted(address indexed user, uint256 amount);  

    function mintPoints(uint256 _amount) external {  
        warpPoints[msg.sender] += _amount;  
        emit PointsMinted(msg.sender, _amount);  
    }  

    function getPoints(address _user) external view returns (uint256) {  
        return warpPoints[_user];  
    }  
}  
