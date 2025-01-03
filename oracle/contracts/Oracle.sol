// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./VerificationOracleInterface.sol";
import "./VerificationOracleClientInterface.sol";

contract Oracle is Ownable, VerificationOracleInterface {
    uint requestId = 0;

    struct RequestData {
        address requester;
        bytes32 hash;
    }

    mapping(uint => RequestData) private requests;

    constructor() Ownable(msg.sender) {}

    function requestVerification(address requester, bytes32 hash) public {
        requests[requestId] = RequestData(requester, hash);
        requestId++;

        emit Request(requestId, hash);
    }

    function responseCallback(
        uint _requestId,
        bool isMalware
    ) public onlyOwner {
        RequestData storage data = requests[_requestId];

        VerificationOracleClientInterface(data.requester).verificationCallback(
            isMalware
        );
    }
}
