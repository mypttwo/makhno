pragma solidity ^0.4.22;

import './Ownable.sol';

contract Makhno is Ownable {

    event BidPlaced();
    event GameStarted();
    event GameEnded();

    uint public bidSize = 0;
    uint public jackpot = 0;
    uint public gameStatus = 0;
    address public jackpotOwner = owner;

    mapping (address => uint) pendingWithdrawals;

    function start (uint _jackpot, uint _bidSize) external onlyOwner {
        bidSize = _bidSize;
        jackpot = _jackpot;  
        gameStatus = 1;
        jackpotOwner = owner;     

        emit GameStarted(); 
    }

    function end () external onlyOwner {
        gameStatus = 0;

        emit GameEnded();
    }

    function bid () external payable {
        require(gameStatus == 1);
        require(msg.value == bidSize);

        jackpot = jackpot + (msg.value * 4)/5;
        jackpotOwner = msg.sender; 

        emit BidPlaced();
    }

    function withdraw() external {
        uint winnings = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(winnings);
    }

    function getCurrentGame() external view returns (uint, uint, address, uint) {
        return (gameStatus, jackpot, jackpotOwner, bidSize);
    }
}