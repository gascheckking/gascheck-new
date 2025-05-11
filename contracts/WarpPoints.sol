// SPDX-License-Identifier: MIT
// ✅ Redo för Base Network (ChainID: 8453)
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WarpPoints is ERC20, Ownable {
    // ===== BASE-OPTIMERAD =====
    mapping(address => uint256) public lastClaim;
    mapping(address => uint256) public streaks;
    uint256 public dailyReward = 100 * 10**18; // 100 WARP

    constructor() ERC20("WarpPoints", "WARP") Ownable(msg.sender) {}

    // Daglig claim-funktion
    function claimDaily() external {
        require(
            block.timestamp - lastClaim[msg.sender] >= 1 days, 
            "Vänta 24 timmar"
        );
        streaks[msg.sender] = block.timestamp - lastClaim[msg.sender] <= 2 days 
            ? streaks[msg.sender] + 1 
            : 1;
        _mint(msg.sender, dailyReward * streaks[msg.sender]);
        lastClaim[msg.sender] = block.timestamp;
    }

    // Admin-funktion för framtida uppdateringar
    function updateReward(uint256 newReward) external onlyOwner {
        dailyReward = newReward;
    }
}
