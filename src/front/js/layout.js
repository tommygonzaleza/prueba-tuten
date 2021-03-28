import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { LoggedIn } from "./pages/LoggedIn";
import injectContext from "./store/appContext";

import { MyNavbar } from "./component/navbar";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem("token")) {
			setLoggedIn(true);
		}
		let time = new Date();
		let time_info = {
			time: time.valueOf(),
			timezone: time.getTimezoneOffset() / 60
		};
		fetch(process.env.BACKEND_URL + "/api/time", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				time: time.valueOf(),
				timezone: time.getTimezoneOffset() / 60
			})
		})
			.then(response => response.json())
			.then(data => console.log(data));
	}, []);

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<MyNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
					<Switch>
						<Route exact path="/">
							<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
						</Route>
						<Route exact path="/logged-in">
							<LoggedIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
