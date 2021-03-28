import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Nav, Navbar } from "react-bootstrap";
import PropTypes from "prop-types";

export const MyNavbar = props => {
	const { store } = useContext(Context);
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="/" className="w-50">
				<img
					src="https://interfell.com/wp-content/uploads/2019/02/LogoCompleto-MenuSuperior.png"
					className="w-50"
				/>
			</Navbar.Brand>
			{props.loggedIn ? (
				<>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto">
							<>
								<Nav.Link className="text-light mx-3" disabled href="#deets">
									Welcome back! <strong>{sessionStorage.getItem("name")}</strong>
								</Nav.Link>
								<Nav.Link
									href="/"
									className="text-light mx-3"
									onClick={e => {
										props.setLoggedIn(false);
										sessionStorage.clear();
									}}>
									Log out
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
