import Head from "next/head";

export default function NextHead({title}) {
	return (
		<Head>
			<title>{`Web3Voting | ${title}`}</title>
			<meta charSet="utf-8" />
			<meta httpEquiv="Content-Language" content="en" />
			<meta
				name="description"
				content="A decentralized voting DApp leveraging blockchain technology to ensure transparency, security, and anonymity in every vote. Participate in decision-making with confidence and integrity."
			/>
			<meta name="robots" content="index, follow" />
			<meta name="author" content="Erlon Dantas da Nobrega Junior" />
			<meta
				name="keywords"
				content="decentralized voting, blockchain voting, secure voting, transparent voting, digital democracy, DApp, voting platform, blockchain technology"
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			{/* OG Cards */}
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://SET_LINK/" />
			<meta property="og:image" content="/assets/voting-logo.png" />
			<meta property="og:locale" content="en_US" />
			<meta
				property="og:description"
				content="A decentralized voting DApp leveraging blockchain technology to ensure transparency, security, and anonymity in every vote. Participate in decision-making with confidence and integrity."
			/>

			{/* Twitter Cards */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="Web3Voting" />
			<meta
				name="twitter:description"
				content="decentralized voting, blockchain voting, secure voting, transparent voting, digital democracy, DApp, voting platform, blockchain technology"
			/>
			<meta name="twitter:image" content="/assets/voting-logo.png" />


			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}