"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextHead from "@/components/NextHead";

import { getCurrentVoting, addVote, walletHasVoted } from "@/services/Web3Service";
import { dateFormatter } from "@/utils/formatters";

export default function Vote() {

    const { push } = useRouter();

    const [voting, setVoting] = useState({ endDate: Date.now() });

    const [showVotes, setShowVotes] = useState(0);

    const [hasVoted, setHasVoted] = useState(false);

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    function logout() {
        localStorage.removeItem("wallet");
        notifySuccess("Logout!");
        push("/");
    }

    function vote(choice) {
        addVote(choice)
            .then(() => {
                notifySuccess("Voting confirmed!");
                return getCurrentVoting();
            })
            .then(voting => {
                setVoting(voting);

                return walletHasVoted();
            })
            .then(tx => {
                if (Number(tx.choice) !== 0) {
                    setShowVotes(tx.choice);
                    setHasVoted(true);
                }
            })
            .catch(error => notifyError(`Error: ${error.message}`));
    }

    useEffect(() => {
        if (!localStorage.getItem("wallet")) {
            notifyError("Wallet not connected!");
            push("/");
        }
    }, []);

    useEffect(() => {
        getCurrentVoting()
            .then(voting => {
                notifySuccess("Voting loaded");
                setVoting(voting);
            })
            .catch(error => {
                console.error(error);
                notifyError(`Error: ${error.message}`)
            });
        walletHasVoted()
            .then(tx => {
                if (Number(tx.choice) !== 0) {
                    setShowVotes(tx.choice);
                    setHasVoted(true);
                }
            })
            .catch(error => notifyError(`Error: ${error.message}`));
    }, []);

    return (
        <>

            <NextHead title={"Vote"} />
            <ToastContainer />

            <Header logoutFunction={logout} />

            <div className="container-fluid">

                <div className="row flex-lg-row align-items-center py-5 px-5 mx-5 mt-4">
                    <h1 className="fw-bold mb-0">Web3 Voting</h1>
                    <p className="lead mb-3 mt-2 fw-semibold">On-chain voting | Decentralized voting</p>
                    <hr/>
                    {
                        voting
                            ?
                            <>
                                <p className="lead fw-bold mb-0">Voting Title: <span className="fw-normal">{voting.title}</span></p>
                                <p className="lead fw-bold mb-0">Voting End Date: <span className="fw-normal">{dateFormatter(voting.endDate)}</span></p>
                                <p className="lead fw-bold">
                                    Voting Status:
                                    {
                                        voting.endDate > (Date.now() / 1000)
                                            ? <span className="fw-normal"> Open</span>
                                            : <span className="fw-normal"> Close</span>
                                    }
                                </p>
                            </>
                            : <></>
                    }
                </div>

                <div className="row flex-lg-row justify-content-between align-items-center g-5 mb-5 px-5 mx-5" style={{ justifyItems: "center" }}>

                    {
                        !voting
                            ?
                            <>
                                <div className="col-lg-12">
                                    <h1>No voting open at the moment!</h1>
                                </div>
                            </>
                            :
                            <>
                                <div className="col-lg-6 col-md-6 mt-2 text-center mb-5">
                                    <img className="image-fluid rounded" src={voting.imgOptionOne} width={200} height={200} />
                                    <p className="lead">{voting.optionOne}</p>
                                    {
                                        showVotes > 0 || voting.endDate < (Date.now() / 1000) || hasVoted
                                            ?
                                            <>
                                                <button className="btn btn-success btn-lg" style={{ width: 200 }} disabled={true}>
                                                    <span className="lead">
                                                        {
                                                            showVotes === 1
                                                                ? Number(voting.optionOneVotes) + 1
                                                                : Number(voting.optionOneVotes)
                                                        }
                                                        &nbsp;Vote(s)
                                                    </span>
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button className="btn btn-success btn-lg" style={{ width: 200 }} onClick={() => vote(1)}>
                                                    <span className="lead">
                                                        Vote
                                                    </span>
                                                </button>
                                            </>
                                    }
                                </div>

                                <div className="col-lg-6 col-md-6 mt-2 text-center mb-5" >
                                    <img className="image-fluid rounded" src={voting.imgOptionTwo} width={200} height={200} />
                                    <p className="lead">{voting.optionTwo}</p>
                                    {
                                        showVotes > 0 || voting.endDate < (Date.now() / 1000) || hasVoted
                                            ?
                                            <>
                                                <button className="btn btn-success btn-lg" style={{ width: 200 }} disabled={true}>
                                                    <span className="lead">
                                                        {
                                                            showVotes === 2
                                                                ? Number(voting.optionTwoVotes) + 1
                                                                : Number(voting.optionTwoVotes)
                                                        }
                                                        &nbsp;Vote(s)
                                                    </span>
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button className="btn btn-success btn-lg" style={{ width: 200 }} onClick={() => vote(2)}>
                                                    <span className="lead">
                                                        Vote
                                                    </span>
                                                </button>
                                            </>
                                    }
                                </div>
                            </>
                    }
                </div>

            </div>

            <Footer />
        </>
    );
}
