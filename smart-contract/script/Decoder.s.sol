// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20 <0.9.0;

import {Script, console} from "forge-std/Script.sol";
import {Web3Voting, Voting} from "../src/Web3Voting.sol";
import {Decoder} from "../src/Decoder.sol";

contract DecodeScript is Script {
    function setUp() public {}

    function run() public {
        address votingContractAddress = 0x5FbDB2315678afecb367f032d93F642f64180aa3;

        Decoder decoder = new Decoder();

        Voting memory votingData = decoder.decodeVoting(votingContractAddress);

        console.log("Title:", votingData.title);
        console.log("Option 1:", votingData.optionOne);
        console.log("Image Option 1:", votingData.imgOptionOne);
        console.log("Option 2:", votingData.optionTwo);
        console.log("Image Option 2:", votingData.imgOptionTwo);
        console.log("Option 1 Votes:", votingData.optionOneVotes);
        console.log("Option 2 Votes:", votingData.optionTwoVotes);
        console.log("Start Date:", votingData.startDate);
        console.log("End Date:", votingData.endDate);
    }
}