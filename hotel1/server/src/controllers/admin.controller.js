// controllers/admin.controller.js

import { connectToDatabase } from '../db/db.js';

async function getDailyRevenue(req, res) {
  const { date } = req.params; 
  console.log(date);
  
  try {
      const connection = await connectToDatabase();

      // Query to get total revenue, number of bookings, occupied rooms, and available rooms for the specified date
      const [results] = await connection.execute(`
          SELECT 
              COUNT(b.booking_id) AS total_bookings,
              SUM(b.total_amount) AS total_revenue,
              (SELECT COUNT(*) FROM Rooms WHERE status = 'occupied') AS occupied_rooms,
              (SELECT COUNT(*) FROM Rooms WHERE status = 'available') AS available_rooms
          FROM 
              Bookings b
          WHERE 
              DATE(b.check_in_date) = ? 
              AND b.payment_status = 'paid'
      `, [date]);

      console.log('Query results:', results); // Log query results

      if (results.length === 0) {
          return res.status(200).json({ totalBookings: 0, totalRevenue: 0, occupiedRooms: 0, availableRooms: 0 });
      }

      res.status(200).json({
          totalBookings: results[0].total_bookings || 0,
          totalRevenue: results[0].total_revenue || 0,
          occupiedRooms: results[0].occupied_rooms || 0,
          availableRooms: results[0].available_rooms || 0,
      });
  } catch (error) {
      console.error('Error fetching revenue data:', error); // Log the error
      res.status(500).json({ message: 'Server error', error });
  }
}

export { getDailyRevenue };
