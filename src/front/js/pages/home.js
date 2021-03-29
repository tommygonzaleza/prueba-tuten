import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button, Carousel } from "react-bootstrap";
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
			.catch(() => {
				alert("Contraseña/Usuario incorrecto");
			});
	};

	return (
		<div className="text-center home">
			{window.matchMedia("(min-width: 800px)").matches ? (
				<Carousel className="d-inline-block">
					<Carousel.Item>
						<img
							className="d-block w-100 h-100"
							src="https://i.ibb.co/tznCskP/login-1.jpg"
							alt="First slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100 h-100"
							src="https://i.ibb.co/jTGssRt/login-2.jpg"
							alt="Second slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100 h-100"
							src="https://i.ibb.co/7RYKt7M/login-3.jpg"
							alt="Third slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100 h-100"
							src="https://i.ibb.co/TbhqQn7/login-4.jpg"
							alt="Fourth slide"
						/>
					</Carousel.Item>
				</Carousel>
			) : (
				""
			)}

			<Card className="login-card" style={{ width: "20rem" }}>
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
								<i
									className="fas fa-eye-slash d-inline-block pointer"
									onClick={e => setPassIcon(false)}
								/>
							) : (
								<i className="fas fa-eye d-inline-block pointer" onClick={e => setPassIcon(true)} />
							)}
						</div>
						<input
							className="w-100"
							placeholder="Type your password..."
							type={passIcon ? "password" : "text"}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<img
							src="https://i.ibb.co/RgYDd6q/boton2-06.png"
							alt="Button"
							className="login-button mx-auto pointer"
							onClick={e => loginValidation(e)}
						/>
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
