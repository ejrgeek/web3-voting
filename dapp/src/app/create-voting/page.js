"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextHead from "@/components/NextHead";

import { connectWallet, addVoting } from "@/services/Web3Service";
import { dateFormatter } from "@/utils/formatters";

export default function CreateVoting() {

    const { push } = useRouter();

    const [wallet, setWallet] = useState("");

    const [voting, setVoting] = useState({
        title: "",
        optionOne: "",
        imgOptionOne: "",
        optionTwo: "",
        imgOptionTwo: "",
        endDate: 1,
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    function logout() {
        localStorage.removeItem("wallet");
        notifySuccess("Logout!");
        push("/");
    }

    function btnConnectWallet() {
        connectWallet()
            .then(wallet => {
                notifySuccess(`Wallet Connected! Address: ${wallet}`);
            })
            .catch(error => notifyError(`Error: ${error.message}`));
    }

    function onInputChange(evt) {
        const { id, value } = evt.target;
        setVoting((prevState) => ({
            ...prevState,
            [id]: id === "endDate" ? Number(value) : value,
        }));
    }

    function createVoting() {
        addVoting(voting)
            .then(() => {
                notifySuccess("Voting Created");
                push("/vote");
            })
            .catch(error => notifyError(`Error: ${error.message}`));
    }

    useEffect(() => {
        const wallet = localStorage.getItem("wallet");

        if (wallet) {
            setWallet(wallet);
        }
    });

    return (
        <>

            <NextHead title={"Vote"} />
            <ToastContainer />

            <Header logoutFunction={logout} />

            <div className="container-fluid">

                <div className="row flex-lg-row align-items-center py-5 px-5 mx-5 mt-4">
                    <h1 className="fw-bold mb-0">Web3 Voting</h1>
                    <p className="lead mb-3 mt-2 fw-semibold">On-chain voting | Decentralized voting</p>
                    <hr />
                    <p className="lead mb-0 mt-2 fw-bold">To create a new voting, you need to be the owner of the contract</p>

                </div>

                {
                    !wallet
                        ?
                        <>
                            <div className="row flex-lg-row justify-content-between align-items-center g-5 mb-5 px-5 mx-5" style={{ justifyItems: "center" }}>
                                <div className="col-lg-12 col-md-12 text-center mt-5" style={{ justifyItems: "center" }}>
                                    <button
                                        className="btn btn-info btn-lg fw-semibold d-flex align-items-center gap-2 mt-5"
                                        onClick={btnConnectWallet}
                                    >
                                        <img
                                            src="assets/metamask-logo.png"
                                            alt="Metamask Logo"
                                            height="32"
                                        />
                                        Connect to Metamask
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="row flex-lg-row g-4 mb-5 px-5 mx-5">
                                <div className="col-lg-6 col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="optionOne" className="form-label">First option name</label>
                                        <input required minLength={3} type="text" className="form-control" id="optionOne" value={voting.optionOne} onChange={onInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="imgOptionOne" className="form-label">Image URL of the first option</label>
                                        <input required minLength={10} type="url" className="form-control" id="imgOptionOne" value={voting.imgOptionOne} onChange={onInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title of the Voting Proposal</label>
                                        <input type="text" className="form-control" id="title" value={voting.title} onChange={onInputChange} />
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="optionTwo" className="form-label">Second option name</label>
                                        <input required minLength={3} type="text" className="form-control" id="optionTwo" value={voting.optionTwo} onChange={onInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="imgOptionTwo" className="form-label">Image URL of the second option</label>
                                        <input required minLength={10} type="url" className="form-control" id="imgOptionTwo" value={voting.imgOptionTwo} onChange={onInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="endDate" className="form-label">Total days of voting</label>
                                        <input type="number" className="form-control" id="endDate" value={voting.endDate} onChange={onInputChange} />
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <div className="mb-3">
                                        <input
                                            type="button"
                                            className="btn btn-dark btn-block fw-semibold d-flex align-items-center"
                                            style={{ width: "100%" }}
                                            onClick={createVoting}
                                            defaultValue={"Create Voting"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>

                }

            </div>

            <Footer />
        </>
    );
}
