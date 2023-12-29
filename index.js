// Import required packages and modules
const express = require( 'express' ); // Express.js for building the web server
const dbConnet = require( './config/dbConnet' ); // Custom database connection module
const app = express(); // Create an instance of the Express application
const dotenv = require( 'dotenv' ).config(); // Load environment variables from .env file
const PORT = 5000; // Port on which the server will listen
const authRouter = require( './routes/authRoute' ); // Router for authentication-related routes
const bodyParser = require( 'body-parser' ); // Middleware for parsing request bodies
const { notFound, errorHandler } = require( './middlewares/errorHandler' ); // Custom error handling middlewares

// Connect to the database
dbConnet();

// Use bodyParser middleware for handling JSON and form data
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

app.get( '/', ( req, res ) => {
  res.send( 'Hello World!' )
} )

// Use the authRouter for the "/api/user" route
app.use( '/api/user', authRouter );

// Middlewares for handling 404 Not Found and error responses
app.use( notFound );
app.use( errorHandler );

// Start the server and listen on the specified port
app.listen( PORT, () => {
  console.log( `Server is listening on port ${ PORT }` );
} );
