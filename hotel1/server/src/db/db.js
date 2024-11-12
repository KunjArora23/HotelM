// Import required modules
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to create and return a database connection
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,        // Accessing DB host from .env file
      user: process.env.DB_USER,        // Accessing DB user from .env file
      password: process.env.DB_PASSWORD, // Accessing DB password from .env file
      database: process.env.DB_NAME      // Accessing DB name from .env file
    });

    console.log('Connected to the database as ID', connection.threadId);
    return connection; // Return the connection instance
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    throw err; // Re-throw the error for handling at the call site
  }
}

export { connectToDatabase };
