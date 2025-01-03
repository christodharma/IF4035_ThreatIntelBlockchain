// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Ioc} from "./Ioc.sol";

contract IocFactory {
    address[] public publishedIocs;
    address public oracleAddress;

    event IocPublished(
        address iocAddress,
        address owner,
        string hash,
        uint price
    );

    constructor(address _oracleAddress) {
        oracleAddress = _oracleAddress;
    }

    function publishIoc(
        string memory hash,
        string memory _fileCid,
        uint price
    ) public {
        Ioc newIoc = new Ioc(msg.sender, hash, _fileCid, price, oracleAddress);

        publishedIocs.push(address(newIoc));

        emit IocPublished(address(newIoc), msg.sender, hash, price);
    }

    function getPublishedIocs() public view returns (address[] memory) {
        return publishedIocs;
    }
}
