import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Nav, Navbar } from "react-bootstrap";
import PropTypes from "prop-types";

export const MyNavbar = props => {
	const { store } = useContext(Context);
	return (
		<Navbar collapseOnSelect expand="lg" className="py-0" style={{ backgroundColor: "#7829c3" }}>
			<Navbar.Brand href="/" className="w-50 m-0">
				<img
					src="https://i.ibb.co/gFcRPj8/LOGO2-06.png"
					className={window.matchMedia("(min-width: 800px)").matches ? "w-50" : "w-100"}
				/>
			</Navbar.Brand>
			{props.loggedIn ? (
				<>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto">
							<>
								<Nav.Link
									className="text-light mx-3 align-items-bottom"
									disabled
									href="#deets"
									style={{ fontSize: "18px" }}>
									¡Welcome back! <strong>{sessionStorage.getItem("name")}</strong>
								</Nav.Link>
								<Nav.Link
									href="/"
									className="text-light mx-3"
									onClick={() => {
										props.setLoggedIn(false);
										sessionStorage.clear();
									}}
									style={{ fontSize: "18px" }}>
									<strong>Log out</strong>
								</Nav.Link>
							</>
						</Nav>
					</Navbar.Collapse>
				</>
			) : (
				""
			)}
		</Navbar>
	);
};

MyNavbar.propTypes = {
	loggedIn: PropTypes.bool,
	setLoggedIn: PropTypes.func
};
