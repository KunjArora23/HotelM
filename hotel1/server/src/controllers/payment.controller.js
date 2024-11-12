import { connectToDatabase } from '../db/db.js';






export async function makePayment(req, res) {
  const { bookingId, paymentAmount } = req.body;
  console.log("Payment Amount",paymentAmount);
  
  try {
    const connection = await connectToDatabase();

    // Step 1: Retrieve booking details
    const [bookingResult] = await connection.execute(
      `SELECT total_amount, payment_status FROM Bookings WHERE booking_id = ?`,
      [bookingId]
    );

    if (bookingResult.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    console.log("Booking Result: ", bookingResult)


    const { total_amount: totalAmount, payment_status: paymentStatus } = bookingResult[0];
    
    if (paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Booking is already paid' });
    }

    if (paymentAmount < totalAmount) {
      return res.status(400).json({ message: 'Insufficient payment amount' });
    }


    // Step 2: Update payment status in Bookings table

    const today = new Date();
    const paymentDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const payment = await connection.execute(
      `Insert into Payments (booking_id,payment_date,amount,payment_method,payment_status)  Values (?,?,?,?,?) `,
      [bookingId, paymentDate, totalAmount, "online", "paid"]
    )
    console.log("Payment details", payment);

    const bookingUpdate = await connection.execute(
      `UPDATE Bookings SET payment_status = 'paid',booking_status='confirmed' WHERE booking_id = ?`,
      [bookingId]
    );

    console.log("Booking Update", bookingUpdate);


    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}
