import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../styles/home.scss";

export const Home = props => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passIcon, setPassIcon] = useState(true);

	const loginValidation = e => {
		e.preventDefault();
		let url = `https://dev.tuten.cl:443/TutenREST/rest/user/${email}`;
		fetch(url, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				password: password,
				app: "APP_BCK"
			}
		})
			.then(response => response.json())
			.then(result => {
				sessionStorage.setItem("token", result.sessionTokenBck);
				sessionStorage.setItem("name", result.firstName);
				props.setLoggedIn(true);
			})
			.catch(error => {
				alert("Contraseña/Usuario incorrecto");
			});
	};

	return (
		<div className="text-center mt-5">
			<Card className="mx-auto my-auto" style={{ width: "20rem" }}>
				<Card.Body>
					<Card.Title>LOGIN</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Nice to see you over here again!</Card.Subtitle>
					<form
						className="my-3"
						onSubmit={e => {
							loginValidation(e);
						}}>
						<label className="w-100 text-left">Email</label>
						<input
							className="w-100"
							placeholder="Type your email..."
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<div className="w-100 text-left mt-2">
							<label className="text-left d-inline-block mr-2">Password</label>
							{passIcon ? (
								<i className="fas fa-eye-slash d-inline-block" onClick={e => setPassIcon(false)} />
							) : (
								<i className="fas fa-eye d-inline-block" onClick={e => setPassIcon(true)} />
							)}
						</div>
						<input
							className="w-100"
							placeholder="Type your password..."
							type={passIcon ? "password" : "text"}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Button variant="outline-dark" border="dark" className="bg-dark text-light mt-3" type="submit">
							Login
						</Button>
					</form>
				</Card.Body>
			</Card>
			{props.loggedIn ? <Redirect to="/logged-in" /> : ""}
		</div>
	);
};

Home.propTypes = {
	loggedIn: PropTypes.bool,
	setLoggedIn: PropTypes.func
};
