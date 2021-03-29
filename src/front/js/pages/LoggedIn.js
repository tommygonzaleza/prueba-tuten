import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Redirect } from "react-router-dom";
import { MyCard } from "../component/MyCard";
import { Footer } from "../component/footer";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const LoggedIn = props => {
	const { store, actions } = useContext(Context);

	const [bookings, setBookings] = useState([]);
	const [filterBooking, setFilterBooking] = useState("");
	const [filterValue, setFilterValue] = useState("");
	const [filterInput, setFilterInput] = useState("");

	useEffect(() => {
		fetchBookings();
	}, []);

	const fetchBookings = () => {
		let url = `https://dev.tuten.cl:443/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true`;
		fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				adminemail: "testapis@tuten.cl",
				token: sessionStorage.getItem("token"),
				app: "APP_BCK"
			}
		})
			.then(response => response.json())
			.then(data => {
				setBookings(data);
			});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (filterBooking != "" && filterInput != "" && filterValue != "") {
			if (filterBooking == "id") {
				if (filterValue == ">=") {
					setBookings(bookings.filter(item => item.bookingId >= filterInput));
				} else {
					setBookings(bookings.filter(item => item.bookingId <= filterInput));
				}
			} else {
				if (filterValue == ">=") {
					setBookings(bookings.filter(item => item.bookingPrice >= filterInput));
				} else {
					setBookings(bookings.filter(item => item.bookingPrice <= filterInput));
				}
			}
		}
	};

	return (
		<>
			<div className="align-items-center text-center mt-5 container">
				<h1 className="text-left" style={{ color: "#7829c3" }}>
					Bookings
				</h1>
				{bookings.length == 0 ? (
					<h3 className="text-secondary">No ha realizado ningún booking...</h3>
				) : (
					<>
						<Form onSubmit={e => handleSubmit(e)}>
							<div className="row">
								<input
									placeholder="Ingrese el valor para filtrar"
									value={filterInput}
									onChange={e => setFilterInput(e.target.value)}
									className="col-sm-12 col-md-6 mb-3 mx-3 mx-md-0 outline-none border-none"
								/>
								<Form.Group className="col-sm-12 col-md-3" controlId="exampleForm.SelectCustom">
									<Form.Control as="select" onChange={e => setFilterBooking(e.target.value)} custom>
										<option defaultValue>Filtrar por:</option>
										<option value="id">bookingId</option>
										<option value="price">bookingPrice</option>
									</Form.Control>
								</Form.Group>
								<Form.Group className="col-sm-12 col-md-3" controlId="exampleForm.SelectCustom">
									<Form.Control as="select" onChange={e => setFilterValue(e.target.value)} custom>
										<option defaultValue>Filtrar por:</option>
										<option value=">=">Mayor o igual {"(>=)"}</option>
										<option value="<=">Menor o igual {"(<=)"}</option>
									</Form.Control>
								</Form.Group>
							</div>
							<div className="row align-items-center text-center mb-3">
								<Button
									variant="outline-dark"
									border="dark"
									className="text-light my-3 col-sm-12 col-md-2 mx-3 mx-md-0"
									style={{ backgroundColor: "#7829c3" }}
									type="submit">
									Filtrar
								</Button>
								<i
									className="fas fa-redo-alt col-sm-12 col-md-2 pointer"
									onClick={() => fetchBookings()}
								/>
							</div>
						</Form>
						<div className="d-flex flex-wrap align-items-center justify-content-center w-100">
							{bookings.map((item, index) => {
								return (
									<MyCard
										bookingId={item.bookingId}
										client={`${item.tutenUserClient.firstName} ${item.tutenUserClient.lastName}`}
										bookingTime={item.bookingTime}
										streetAddress={item.locationId.streetAddress}
										bookingPrice={item.bookingPrice}
										key={index}
									/>
								);
							})}
						</div>
					</>
				)}
				{props.loggedIn ? "" : <Redirect to="/" />}
			</div>
			<Footer />
		</>
	);
};

LoggedIn.propTypes = {
	loggedIn: PropTypes.bool,
	setLoggedIn: PropTypes.func
};
