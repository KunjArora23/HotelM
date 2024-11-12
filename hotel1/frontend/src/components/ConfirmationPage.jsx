// Confirmation.js

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Confirmation() {
  const location = useLocation();
  const { bookingId } = location.state; // Booking ID passed from Payment component
  const [bookingDetails, setBookingDetails] = useState(null);

  // Fetch booking details from backend
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/users/booking/${bookingId}`,
          { withCredentials: true } 
        );
        console.log("done in confirmation frontend");
        
        setBookingDetails(res.data);
      } catch (error) {
        console.log(error);
        
        alert("Failed to load booking details");
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!bookingDetails) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Booking Confirmation</h1>
      <p>Booking ID: {bookingDetails.bookingId}</p>
      <p>Guest Name: {bookingDetails.guestName}</p>
      <p>Room Number: {bookingDetails.roomNumber}</p>
      <p>Room Type: {bookingDetails.roomType}</p>
      <p>Check-in Date: {bookingDetails.checkInDate}</p>
      <p>Check-out Date: {bookingDetails.checkOutDate}</p>
      <p>Payment Status: {bookingDetails.paymentStatus}</p>
      <p>Total Amount: Rs {bookingDetails.totalAmount}</p>
    </div>
  );
}

export default Confirmation;
