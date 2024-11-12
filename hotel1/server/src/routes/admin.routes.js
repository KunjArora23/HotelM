// routes/admin.routes.js

import express from 'express';
import { getDailyRevenue } from '../controllers/admin.controller.js';

const router = express.Router();

// Route to get daily revenue and bookings
router.get('/revenue/:date', getDailyRevenue);

export default router;