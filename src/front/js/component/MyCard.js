import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const MyCard = props => {
	let date = new Date(props.bookingTime);
	let modified_date = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
	return (
		<Card className="m-2 col-3 round-card" style={{ minWidth: "19rem", maxWidth: "19rem", minHeight: "22rem" }}>
			<Card.Body className="text-left">
				<Card.Text className="text-right my-4" style={{ color: "#7829c3" }}>
					BookingId: <strong>{props.bookingId}</strong>
				</Card.Text>
				<Card.Text>
					<strong>Cliente:</strong> {props.client}
				</Card.Text>
				<Card.Text>
					<strong>Fecha de Creación:</strong> {modified_date}
				</Card.Text>
				<Card.Text className="text-justify">
					<strong>Dirección:</strong> {props.streetAddress}
				</Card.Text>
				<Card.Text className="text-center mt-3">
					<strong>Precio:</strong> $ {props.bookingPrice}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

MyCard.propTypes = {
	bookingId: PropTypes.number,
	client: PropTypes.string,
	bookingTime: PropTypes.number,
	streetAddress: PropTypes.string,
	bookingPrice: PropTypes.number
};
