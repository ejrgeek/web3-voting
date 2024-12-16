export default function Footer() {
	return (
		<>
			<nav className="navbar fixed-bottom bg-info">
				<div className="container-fluid px-5 mx-5">
					<p className="col-md-6 mb-0 text-gray">
						&copy; {new Date().getFullYear()}&nbsp;
						<a href="https://github.com/ejrgeek/web3-voting" style={{ color: "#212529", textDecoration: "none" }} target="_blank" className="fw-bold">Web3 Voting</a>
						&nbsp;made with ❤️ by&nbsp;
						<a href="https://erlondnjr.com.br/" style={{ color: "#212529", textDecoration: "none" }} target="_blank" className="fw-bold">Erlon Dantas</a>
					</p>
				</div>	
			</nav>
		</>
	);
}