// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.20 <0.9.0;

import {Test, console} from "forge-std/Test.sol";
import {Web3Voting} from "../src/Web3Voting.sol";

contract Web3VotingTest is Test {
    Web3Voting public mySM;

    address owner = address(0x1);

    function setUp() public {
        mySM = new Web3Voting();
    }
}
