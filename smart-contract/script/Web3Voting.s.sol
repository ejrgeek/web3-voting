// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.20 <0.9.0;

import {Script, console} from "forge-std/Script.sol";
import {Web3Voting} from "../src/Web3Voting.sol";

contract Web3VotingScript is Script {
    Web3Voting public myContract;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        myContract = new Web3Voting();

        vm.stopBroadcast();
    }
}
