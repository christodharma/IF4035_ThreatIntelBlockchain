// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {VerificationOracleClientInterface} from "./VerificationOracleClientInterface.sol";
import {VerificationOracleInterface} from "./VerificationOracleInterface.sol";

contract Ioc is VerificationOracleClientInterface {
    address public owner;
    string public hash;
    string public fileCid;
    uint public price;
    uint public purchaseCount;
    bool public isVerified;
    bool public isMalware;

    event IocPurchased(address iocAddress, address buyer);
    event IocVerified(address iocAddress, bool isMalware);

    constructor(
        address _owner,
        string memory _hash,
        string memory _fileCid,
        uint _price,
        address _oracleAddress
    ) {
        require(_owner != address(0), "You must provide an owner");

        owner = _owner;
        hash = _hash;
        fileCid = _fileCid;
        price = _price;
        purchaseCount = 0;

        VerificationOracleInterface(_oracleAddress).requestVerification(
            address(this),
            hash
        );
    }

    function purchase() public payable {
        require(msg.sender != owner, "You can't buy your items");
        require(msg.value >= price, "You must pay at least the price");
        require(
            msg.sender == tx.origin,
            "Contracts are not allowed to purchase"
        );
        require(isVerified, "Item must be verified");

        purchaseCount++;

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        payable(owner).transfer(price);

        emit IocPurchased(address(this), msg.sender);
    }

    function verificationCallback(bool _isMalware) public {
        isVerified = true;
        isMalware = _isMalware;

        emit IocVerified(address(this), isMalware);
    }
}
