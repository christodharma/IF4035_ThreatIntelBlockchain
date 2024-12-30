// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Ioc} from "./Ioc.sol";

contract IocFactory {
    address[] public publishedIocs;
    address public oracleAddress;

    event IocPublished(
        address iocAddress,
        address owner,
        bytes32 hash,
        uint price
    );

    constructor(address _oracleAddress) {
        oracleAddress = _oracleAddress;
    }

    function publishIoc(
        bytes32 hash,
        string memory _fileCid,
        uint price
    ) public {
        Ioc newProject = new Ioc(msg.sender, hash, _fileCid, price);
        publishedIocs.push(address(newProject));

        emit IocPublished(address(newProject), msg.sender, hash, price);
    }

    function getPublishedIocs() public view returns (address[] memory) {
        return publishedIocs;
    }
}
