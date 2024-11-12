
import { connectToDatabase } from '../db/db.js'

async function createBooking(req, res) {
  const { firstName, lastName, phone, address, idNumber, idType, dob, roomType, checkInDate, checkOutDate } = req.body;
  
  // storing email here during authentication
  const email=req.email
  


  try {
    // 1. Create Connection
    const connection = await connectToDatabase();

    console.log(roomType)

    // 2. Find the room type ID based on the room type name
    const [roomTypeResult] = await connection.execute(`SELECT room_type_id FROM RoomTypes WHERE type_name = ?`, [roomType]);
    
    console.log(roomTypeResult);

    if (roomTypeResult.length === 0) {
      return res.status(404).json({ message: 'Room type not found' });
    }





    const roomTypeId = roomTypeResult[0].room_type_id;

    // 3. Find the first available room for the given room type
    const [availableRooms] = await connection.execute(
      `SELECT room_id, price_per_night FROM Rooms WHERE room_type_id = ? AND status = 'available' LIMIT 1`,
      [roomTypeId]
    );


    console.log(availableRooms)
    if (availableRooms.length === 0) {
      return res.status(400).json({ message: 'No available rooms for the selected room type' });
    }


    const { room_id: roomId, price_per_night: pricePerNight } = availableRooms[0];

    // 4. Calculate the total amount based on the length of stay
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const daysOfStay = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalAmount = daysOfStay * pricePerNight;



  

    const [guestResult] = await connection.execute(
      `INSERT INTO Guests (first_name, last_name, email, phone_number, address, ID_TYPE, ID_number, date_of_birth) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName || null, lastName || null, email, phone || null, address || null, idType || null, idNumber || null, dob || null]
    );

    // this will give the guest id which is inserted automatically using the auto increment
    const guestId = guestResult.insertId;
    // console.log(guestResult);


    // 5. Insert booking into Bookings table with payment status 'unpaid' and booking status 'confirmed'
    const [bookingResult] = await connection.execute(
      `INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date, booking_status, total_amount, payment_status) VALUES (?, ?, ?, ?, 'canceled', ?, 'unpaid')`,
      [guestId, roomId, checkInDate, checkOutDate, totalAmount]
    );
    console.log(bookingResult);


    // 6. Update the room status to 'occupied'
    await connection.execute(`UPDATE Rooms SET status = 'occupied' WHERE room_id = ?`, [roomId]);

    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: bookingResult.insertId,
      guestId,
      roomId,
      totalAmount
    });
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: 'Error while booking room', error });
  }
}

export {createBooking}