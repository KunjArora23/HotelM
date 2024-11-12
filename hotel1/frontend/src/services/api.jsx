import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Adjust this URL to your backend

// Example for fetching all rooms
export const fetchRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

// Fetching a specific guest's bookings
export const fetchGuestBookings = async (guestId) => {
  try {
    const response = await axios.get(`${API_URL}/guests/${guestId}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guest bookings:", error);
    throw error;
  }
};

// Add other API calls based on your requirements
