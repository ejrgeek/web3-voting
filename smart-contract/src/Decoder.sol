// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20 <0.9.0;

import {Web3Voting, Voting} from "./Web3Voting.sol";

contract Decoder {
    function decodeVoting(address votingContract) public view returns (Voting memory) {
        Web3Voting voting = Web3Voting(votingContract);
        return voting.getCurrentVoting();
    }
}