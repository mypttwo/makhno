pragma solidity ^0.4.22;

import './Ownable.sol';

contract Makhno is Ownable {

    event BidPlaced();

    uint public bidSize = 0;
    uint public interval = 0;


    uint public gameStatus = 0;
    uint public currentBidSize = 0;
    uint public currentInterval = 0;
    uint public jackpot = 0;
    uint public timeOfLastBid = 0;
    address public jackpotOwner = owner;

    mapping (address => uint) pendingWithdrawals;

    function set (uint _bidSize, uint _interval) external onlyOwner {
        bidSize = _bidSize;
        interval = _interval;
        jackpotOwner = owner;
    }

    function start (uint _jackpot) external onlyOwner {
        currentBidSize = bidSize;
        currentInterval = interval;
        jackpot = _jackpot;  
        gameStatus = 1;
        jackpotOwner = owner;      
    }

    function end () external onlyOwner {
        gameStatus = 0;
        currentInterval = interval;
    }

    function check() public {
        if (gameStatus == 1) {
            if (currentInterval > now - timeOfLastBid) {
                gameStatus = 0;
                pendingWithdrawals[jackpotOwner] += jackpot;
                jackpotOwner = owner;
                jackpot = 0;
            }
        }
    }    

    function bid () external payable {
        require(gameStatus == 1);
        require(msg.value == currentBidSize);

        jackpot = jackpot + (msg.value * 4)/5;
        timeOfLastBid = now;
        jackpotOwner = msg.sender; 
        emit BidPlaced();
    }

    function withdraw() external {
        uint winnings = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(winnings);
    }

    function getCurrentGame() external view returns (uint, address, uint) {
        return (gameStatus, jackpotOwner, timeOfLastBid);
    }
}