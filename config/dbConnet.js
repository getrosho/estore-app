// Import required packages and modules
const mongoose = require( "mongoose" ); // Mongoose for interacting with MongoDB

// Function to establish a connection to the MongoDB database
const dbConnect = () => {
  try {
    // Attempt to connect to the MongoDB database using the provided URL
    const conn = mongoose.connect( process.env.MONGO_URI );

    // Log a message if the connection is successful
    console.log( 'Database Connected' );
  } catch ( error ) {
    // Log any errors that occur during the connection attempt
    console.log( error );
  }
};

// Export the function to be used in other files
module.exports = dbConnect;
