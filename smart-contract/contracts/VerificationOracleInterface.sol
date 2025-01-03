// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface VerificationOracleInterface {
    event Request(uint requestId, string hash);

    function requestVerification(
        address requester,
        string memory hash
    ) external;

    function responseCallback(uint requestId, bool isMalware) external;
}
