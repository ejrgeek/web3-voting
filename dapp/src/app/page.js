"use client"

import { useRouter } from "next/navigation";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextHead from "@/components/NextHead";
import { connectWallet } from "@/services/Web3Service";

export default function Home() {

	const { push } = useRouter();
	
	const notifySuccess = (message) => toast.success(message);
	const notifyError = (message) => toast.error(message);

	function btnConnectWallet() {
		connectWallet()
			.then(wallet => {
				notifySuccess(`Wallet Connected! Address: ${wallet}`);
				push("/vote");
			})
			.catch(error => notifyError(`Error: ${error.message}`));
	}

	return (
		<>

			<NextHead title={"Login"}/>
			<ToastContainer/>

			<Header/>

			<div className="container-fluid">

				<div className="row flex-lg-row align-items-center py-5 px-5 mx-5">

					<div className="col-lg-6 col-md-6 mt-4">
						<h1 className="fw-bold">Web3 Voting</h1>
						<p className="lead mb-0 mt-3 fw-semibold">On-chain voting | Decentralized voting</p>
						<hr/>
						<p className="lead fw-semibold">Participate in important decisions without intermediaries</p>
						<div className="text-center">
							<img src="assets/voting-login.svg" className="img-fluid " alt="voting-image" width={400} />
						</div>
					</div>

					<div className="col-lg-6 col-md-6 text-center mt-5" style={{ justifyItems: "center" }}>
						<img src="assets/voting-logo.png" className="img-fluid " width={250} />

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

			</div>

			<Footer/>
		</>
	);
}
