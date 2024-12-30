// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface VerificationOracleInterface {
    event Request(uint requestId, bytes32 hash);

    function requestVerification(address requester, bytes32 hash) external;

    function responseCallback(uint requestId, bool isMalware) external;
}
