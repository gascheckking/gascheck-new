// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WarpPoints is ERC20, Ownable {
    // ===== VARIABLER =====
    mapping(address => uint256) public lastClaim;
    mapping(address => uint256) public streaks;
    uint256 public dailyReward = 100 * 10**18; // 100 WARP per dag
    address public warpAIAddress; // För framtida migrering

    // ===== KONSTRUKTÖR =====
    constructor() ERC20("WarpPoints", "WARP") Ownable(msg.sender) {
        warpAIAddress = msg.sender;
    }

    // ===== CLAIM-FUNKTION =====
    function claimDaily() external {
        require(block.timestamp - lastClaim[msg.sender] >= 1 days, "Vänta 24 timmar");

        // Streak-logik
        if (block.timestamp - lastClaim[msg.sender] <= 2 days) {
            streaks[msg.sender] += 1;
        } else {
            streaks[msg.sender] = 1; // Återställ om mer än 2 dagar
        }

        // Ge bonus för streaks
        uint256 reward = dailyReward * streaks[msg.sender];
        _mint(msg.sender, reward);
        lastClaim[msg.sender] = block.timestamp;
    }

    // ===== ADMIN-FUNKTIONER =====
    function updateDailyReward(uint256 newReward) external onlyOwner {
        dailyReward = newReward;
    }
}
