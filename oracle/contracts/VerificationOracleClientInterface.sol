// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface VerificationOracleClientInterface {
    function verificationCallback(bool isMalware) external;
}
