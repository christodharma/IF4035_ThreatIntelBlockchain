// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Ioc {
    address public owner;
    bytes32 public hash;
    string public fileCid;
    uint public price;
    uint public purchaseCount;

    mapping(address => bool) public hasPurchased;

    event Purchased(address buyer);

    constructor(
        address _owner,
        bytes32 _hash,
        string memory _fileCid,
        uint _price
    ) payable {
        require(_owner != address(0), "You must provide an owner");

        owner = _owner;
        hash = _hash;
        fileCid = _fileCid;
        price = _price;
        purchaseCount = 0;
    }

    function purchase() public payable {
        require(msg.sender != owner, "You can't buy your items");
        require(msg.value >= price, "You must pay at least the price");
        require(
            msg.sender == tx.origin,
            "Contracts are not allowed to purchase"
        );

        if (hasPurchased[msg.sender]) {
            emit Purchased(msg.sender);
            return;
        }

        hasPurchased[msg.sender] = true;
        purchaseCount++;

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        payable(owner).transfer(price);

        emit Purchased(msg.sender);
    }

    function getIoc()
        public
        view
        returns (address, bytes32, string memory, uint, uint)
    {
        return (owner, hash, fileCid, price, purchaseCount);
    }
}
