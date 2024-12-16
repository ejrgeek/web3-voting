import Web3 from "web3";
import contractAbi from "./ABI.json";


const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

if (!CONTRACT_ADDRESS) {
    console.error("Contract address not found. Please check your .env file.");
}

export async function connectWallet() {
    if (typeof window === "undefined") throw new Error("Metamask plugin not available in client environment");

    if (!window.ethereum) throw new Error("Metamask plugin not found");

    const web3 = new Web3(window.ethereum);
    /* const web3 = new Web3("http://127.0.0.1:8545"); */

    const accounts = await web3.eth.requestAccounts();

    if (accounts.length === 0) throw new Error("No account found or not allowed to connect");

    localStorage.setItem("wallet", accounts[0]); //!TODO: CHANGE-ME-TO-TEST

    return accounts[0]; //!TODO: CHANGE-ME-TO-TEST
}

function getContract() {
    const web3 = new Web3(window.ethereum);
    /* const web3 = new Web3("http://127.0.0.1:8545"); */

    const from = localStorage.getItem("wallet");

    if(!from) throw new Error("Wallet not found");

    return new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS, { from });
}

export async function addVoting(votingObj) {

    console.log(votingObj);
    
    if (votingObj.title.length < 3) throw new Error("The title of the voting proposal must be more than 3 characters long");
    if (votingObj.optionOne.length < 3) throw new Error("First option name must be more than 3 characters long");
    if (votingObj.imgOptionOne.length < 3) throw new Error("The image url of the first option must be more than 10 characters long");
    if (votingObj.optionTwo.length < 3) throw new Error("Second option name must be more than 3 characters long");
    if (votingObj.imgOptionTwo.length < 3) throw new Error("The image url of the second option must be more than 10 characters long");
    if (votingObj.endDate < 1) throw new Error("The quantity of days must be greater than zero");

    const contract = getContract();

    return await contract.methods.addVoting(votingObj.title, votingObj.optionOne, votingObj.imgOptionOne, votingObj.optionTwo, votingObj.imgOptionTwo, votingObj.endDate).send();
}

export async function addVote(choice){
    if (choice !== 1 && choice !== 2) throw new Error("Invalid choice");
    
    const contract = getContract();

    return await contract.methods.addVote(choice).send();
}

export async function getCurrentVoting() {

    const contract = getContract();

    return await contract.methods.getCurrentVoting().call();
    
}

export async function walletHasVoted() {
    const contract = getContract();

    const wallet = localStorage.getItem("wallet");

    const currentVoting = await contract.methods.currentVoting().call();

    return await contract.methods.votes(currentVoting, wallet).call();
}