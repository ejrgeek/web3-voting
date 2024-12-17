// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.20 <0.9.0;

import {Test, console} from "forge-std/Test.sol";
import {Web3Voting, Voting, Vote} from "../src/Web3Voting.sol";

contract Web3VotingTest is Test {
    Web3Voting private smc;

    address private owner;
    address private user1;
    address private user2;

    function setUp() public {
        
        owner = address(0x1);
        user1 = address(0x2);
        user2 = address(0x3);

        vm.prank(owner);
        smc = new Web3Voting();
    }

    /// @dev You cannot create a voting proposal without being the owner of the contract
    function testFailAddVottingInvalidOwner() public {
        address otherWallet = address(0x4);
        vm.prank(otherWallet);
        smc.addVoting(
            "Test to Fail",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );
        vm.expectRevert("Invalid sender");
    }

    /// @dev You cannot vote for an invalid option
    function testFailVotingInvalidOption() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        vm.prank(user1);
        smc.addVote(3);
        vm.expectRevert("Invalid choice");

    }

    /// @dev You must not vote twice on the same voting proposal
    function testFailVoteTwiceSameVoting() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );
        vm.prank(user1);
        smc.addVote(1);
        smc.addVote(1);
        vm.expectRevert("You already voted on this voting");
    }

    /// @dev You cannot vote once the voting time has passed.
    function testFailVoteOnVotingTimeHasPassed() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        vm.warp(block.timestamp+3);
        vm.prank(user1);
        smc.addVote(1);
        vm.expectRevert("No open voting");
    }

    /// @dev You can create a new voting proposal if you are the contract owner
    function testAddVoting() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        Voting memory currentVoting = smc.getCurrentVoting();

        assertEq(currentVoting.title, "Test to Pass");
        assertEq(currentVoting.optionOne, "Option 1");
        assertEq(currentVoting.imgOptionOne, "url-img-op1");
        assertEq(currentVoting.optionTwo, "Option 2");
        assertEq(currentVoting.imgOptionTwo, "url-img-op2");
        assertEq(currentVoting.endDate, block.timestamp + 2 days);

    }

    /// @dev You should be able to vote for option one
    function testShouldVoteOptionOne() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        vm.prank(user1);
        smc.addVote(1);
        
        Voting memory voting = smc.getCurrentVoting();

        assertEq(voting.optionOneVotes, 1);
        assertEq(voting.optionTwoVotes, 0);

    }

    /// @dev You should be able to vote for option two
    function testShouldVoteOptionTwo() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        vm.prank(user1);
        smc.addVote(2);
        
        Voting memory voting = smc.getCurrentVoting();

        assertEq(voting.optionOneVotes, 0);
        assertEq(voting.optionTwoVotes, 1);
    }

    /// @dev Must allow more than one wallet to vote
    function testMultipleVotes() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        vm.prank(user1);
        smc.addVote(1);

        vm.prank(user2);
        smc.addVote(2);

        vm.prank(address(0x4));
        smc.addVote(2);
        
        Voting memory voting = smc.getCurrentVoting();

        assertEq(voting.optionOneVotes, 1);
        assertEq(voting.optionTwoVotes, 2);
    }

    /// @dev Should return the new voting campaign when a new one is created
    function testReturnNewVoting() public {
        vm.prank(owner);
        smc.addVoting(
            "Test to Pass",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        Voting memory oldVoting = smc.getCurrentVoting();
        
        vm.warp(block.timestamp + 1 seconds);

        vm.prank(owner);
        smc.addVoting(
            "New Voting",
            "Option 1",
            "url-img-op1",
            "Option 2",
            "url-img-op2",
            2
        );

        Voting memory currentVoting = smc.getCurrentVoting();

        assertNotEq(oldVoting.endDate, currentVoting.endDate);
    }

}
