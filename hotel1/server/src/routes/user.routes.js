import express from 'express';

import { ApiResponse } from '../utils/ApiResponse.js'

import { registerUser, loginUser ,logoutUser, getUserDashboard} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.middleware.js';
import { createBooking } from '../controllers/booking.controller.js';
import { getBookingDetails } from '../controllers/confirmation.controller.js';
import { makePayment } from '../controllers/payment.controller.js';
const router = express.Router();


// Route to register a new user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', isAuthenticated, logoutUser);
router.get('/isAuthenticated', isAuthenticated);
router.post('/booking', isAuthenticated,createBooking);
router.get('/booking/:bookingId', isAuthenticated,getBookingDetails);
router.post('/payment', isAuthenticated,makePayment);
router.get('/dashboard', isAuthenticated,getUserDashboard);

export default router;