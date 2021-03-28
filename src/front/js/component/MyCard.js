import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const MyCard = props => {
	return (
		<Card className="m-2 col-3" style={{ minWidth: "19rem", maxWidth: "19rem", minHeight: "20rem" }}>
			<Card.Body className="text-left">
				<Card.Text>
					<strong>Cliente:</strong> {props.client}
				</Card.Text>
				<Card.Text>
					<strong>BookingId:</strong> {props.bookingId}
				</Card.Text>
				<Card.Text>
					<strong>Fecha de Creación:</strong> {props.bookingTime}
				</Card.Text>
				<Card.Text>
					<strong>Dirección:</strong> {props.streetAddress}
				</Card.Text>
				<Card.Text>
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
