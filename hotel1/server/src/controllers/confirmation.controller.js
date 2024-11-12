import { format } from 'date-fns';
import { connectToDatabase } from '../db/db.js'

const getBookingDetails = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const connection = await connectToDatabase();

    
    const email = req.email;  // Ensure this is set correctly
  

    // Step 1: Fetch booking details along with guest_id and room_number
    const bookingQuery = `
      SELECT * FROM bookings
      WHERE booking_id = ?;
    `;
    const [bookingRows] = await connection.execute(bookingQuery, [bookingId]);

    if (bookingRows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = bookingRows[0];
    const guestId = booking.guest_id;
    const roomId = booking.room_id;
    

    const roomNumber=await connection.execute("Select room_number from rooms WHERE room_id =?",[roomId])
    const roomTypeId=await connection.execute("Select * from rooms WHERE room_id =?",[roomId])
    // console.log(roomTypeId);
    
    const roomType=await connection.execute("Select * from RoomTypes WHERE room_type_id =?",[roomTypeId[0][0].room_type_id])
    // console.log(roomType);
    

    

    // Step 2: Fetch guest details using guest_id
    const guestQuery = `
      SELECT * FROM guests
      WHERE guest_id = ?;
    `;
    const [guestRows] = await connection.execute(guestQuery, [guestId]);

    if (guestRows.length === 0) {
      return res.status(404).json({ message: "Guest not found" });
    }

    const guest = guestRows[0];

    // Step 3: Format dates in 'dd-mm-yyyy' format
    const formatDate = (date) => format(new Date(date), 'dd-MM-yyyy');
    const checkInDate = booking.check_in_date ? formatDate(booking.check_in_date) : null;
    const checkOutDate = booking.check_out_date ? formatDate(booking.check_out_date) : null;

    // Step 4: Return booking and guest details
    return res.status(200).json({
      bookingId: booking.booking_id,
      guestName: guest.first_name,  // Assuming 'name' is the field for guest name
      guestEmail: guest.email, // Assuming 'email' is a field in guests table
      roomNumber: roomNumber[0][0].room_number,
      roomType: roomType[0][0].type_name,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      paymentStatus: booking.payment_status,
      totalAmount: booking.total_amount,
      message: "Booking details retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving booking details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getBookingDetails };
