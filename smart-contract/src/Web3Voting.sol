// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20 <0.9.0;

struct Voting {
    string title;
    string optionOne;
    string imgOptionOne;
    uint256 optionOneVotes;
    string optionTwo;
    string imgOptionTwo;
    uint256 optionTwoVotes;
    uint256 startDate;
    uint256 endDate;
}

struct Vote {
    uint256 choice;
    uint256 date;
}

contract Web3Voting {
    address private _owner;
    uint256 public currentVoting = 0;
    Voting[] public votings;
    mapping(uint256 => mapping(address => Vote)) public votes;

    constructor() {
        _owner = msg.sender;
    }

    modifier _validateVotingCreation(
        string calldata title,
        string calldata optionOne,
        string calldata imgOptionOne,
        string calldata optionTwo,
        string calldata imgOptionTwo,
        uint256 endDate
    ) {
        require(_owner == msg.sender, "Invalid sender");
        require(bytes(title).length > 3, "You must pass the name of the first option");
        require(bytes(optionOne).length > 3, "You must pass the name of the first option");
        require(bytes(imgOptionOne).length > 10, "You must pass an image for the first option");
        require(bytes(optionTwo).length > 3, "You must pass the name of the second option");
        require(bytes(imgOptionTwo).length > 10, "You must pass an image for the second option");
        require(endDate > 0, "The quantity of days must be greater than zero");
        _;
    }

    event VotingCreatedEvent(uint256 currentVoting, address indexed owner, uint256 createdAt);
    event VoteEvent(uint256 option, address indexed voter, uint256 votedAt);

    function getCurrentVoting() public view returns (Voting memory) {
        return votings[currentVoting];
    }

    function addVoting(
        string calldata title,
        string calldata optionOne,
        string calldata imgOptionOne,
        string calldata optionTwo,
        string calldata imgOptionTwo,
        uint256 endDate
    ) public _validateVotingCreation(title, optionOne, imgOptionOne, optionTwo, imgOptionTwo, endDate) {
        if (votings.length != 0) currentVoting++;

        Voting memory newVoting;
        newVoting.title = title;
        newVoting.optionOne = optionOne;
        newVoting.imgOptionOne = imgOptionOne;
        newVoting.optionTwo = optionTwo;
        newVoting.imgOptionTwo = imgOptionTwo;
        newVoting.endDate = (endDate * 1 days) + block.timestamp;

        votings.push(newVoting);

        emit VotingCreatedEvent(currentVoting, _owner, block.timestamp);
    }

    function addVote(uint256 choice) public {
        require(choice == 1 || choice == 2, "Invalid choice");
        require(getCurrentVoting().endDate > block.timestamp, "No open voting");
        require(votes[currentVoting][msg.sender].date == 0, "You already voted on this voting");

        votes[currentVoting][msg.sender].choice = choice;
        votes[currentVoting][msg.sender].date = block.timestamp;

        if (choice == 1) votings[currentVoting].optionOneVotes++;
        if (choice == 2) votings[currentVoting].optionTwoVotes++;

        emit VoteEvent(choice, msg.sender, block.timestamp);
    }
}
