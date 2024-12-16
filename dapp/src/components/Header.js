import { useRouter } from "next/navigation";


export default function Header({ logoutFunction }) {

	const { push } = useRouter();

	function goHome() {
		push("/");
	}

	function goCreateVoting(){
		push("/create-voting");
	}

	return (
		<>
			<nav className="navbar fixed-top border-bottom border-body bg-dark">
				<div className="container-fluid px-5 mx-5">
					<div style={{ cursor: "pointer" }} onClick={goHome}>
						<img src="assets/voting-logo.png" className="img-fluid" width={32} />
						<span className="px-3 navbar-brand lead text-center fw-semibold text-white">dApp Web3 Voting</span>
					</div>
					<div>
						<button className={`btn btn-outline-info ${logoutFunction ? "mx-5" : ""} `} onClick={goCreateVoting}>Create Voting</button>
						{
							logoutFunction
								?
								<>
									<button className="btn btn-outline-danger" onClick={logoutFunction}>Logout</button>
								</>
								: <></>
						}
					</div>
				</div>
			</nav>
		</>
	);
}