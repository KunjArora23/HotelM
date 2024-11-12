// Payment.js

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, totalAmount } = location.state;

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      alert("Please fill in all payment details");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/payment",
        {
          bookingId,
          amount: totalAmount,
          paymentData,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Payment successful!");
        navigate("/confirmation", { state: { bookingId } });
      }
    } catch (error) {
      console.log(error);
      alert("Payment failed: " + error.response.data.message);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h1 className="payment-heading">Payment</h1>
        <p className="amount-text">Total Amount: <span>${totalAmount}</span></p>

        <div className="payment-form">
          <label className="label">Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            maxLength="16"
            placeholder="Enter your card number"
            required
            className="input"
          />

          <label className="label">Expiry Date:</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={handleChange}
            maxLength="5"
            placeholder="MM/YY"
            required
            className="input"
          />

          <label className="label">CVV:</label>
          <input
            type="password"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            maxLength="3"
            placeholder="CVV"
            required
            className="input"
          />

          <button onClick={handlePayment} className="button">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
