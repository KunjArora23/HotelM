import React, { useContext, useState } from "react";
import "../css/Booking.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import Navbar2 from "../components/Navbar2.jsx";
import Footer from "../components/Footer.jsx";

function Booking() {
  const navigate = useNavigate();

  const { formData, setFormData } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    console.log(formData); // Handle booking logic, e.g., submit formData to an API

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/booking",
        formData,
        { withCredentials: true }
      );

      console.log(res);

      const { bookingId, totalAmount } = res.data;
      navigate("/payment", { state: { bookingId, totalAmount } });
    } catch (error) {
      alert(error.response.data.message);
      // console.log(error);
    }
  };

  return (
    <div >
      <Navbar2 />
      <div className="container2">
        <h1 className="heading">Book Your Stay</h1>
        <form onSubmit={handleBooking} className="form">
          <label className="label">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label">Phone No:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label">ID Number:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label">ID Type:</label>
          <select
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            className="select"
          >
            <option>Passport</option>
            <option>Driver’s License</option>
            <option>National ID</option>
          </select>

          <label className="label">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            placeholder="dd-mm-yyyy"
            value={formData.dob}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label">Room Type:</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="select"
          >
            <option>Deluxe</option>
            <option>Suite</option>
            <option>Executive</option>
          </select>

          <label className="label">Check-in Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label">Check-out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
            className="input"
          />

          <button type="submit" className="button">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
