// Import required packages and modules
const expressAsyncHandler = require( 'express-async-handler' ); // Middleware for handling asynchronous errors
const User = require( '../models/userModel' ); // User model for interacting with the database
const generateToken = require( '../config/jwtToken' );

// Create a handler for user registration with error handling
const createUser = expressAsyncHandler( async ( req, res ) => {
  // Extract email from the request body
  const email = req.body.email;

  // Find a user with the given email in the database
  const findUser = await User.findOne( { email: email } );

  try {
    // Check if the user with the email already exists
    if ( !findUser ) {
      // Create a new user if not exists
      const newUser = await User.create( req.body );
      res.status( 200 ).json( newUser );
    } else {
      // Throw an error if the user already exists
      throw new Error( 'User already exists' );
    }
  } catch ( error ) {
    // Log any errors that occur during user creation
    console.log( error );
  }
} );

// Login Ctrl
const loginUserCtrl = expressAsyncHandler( async ( req, res ) => {
  const { email, password } = req.body;
  // check if user exist or not?
  const findUser = await User.findOne( { email: email } );
  if ( findUser && await findUser.isPasswordMatched( password ) ) {
    res.json( {
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role: findUser?.role,
      token: generateToken( findUser?._id )
    } );
  } else {
    throw new Error( "Invalid Credentials" );
  }
} )

// Get all users:
const getAllUsers = expressAsyncHandler( async ( req, res ) => {
  try {
    const getUsers = await User.find();
    res.json( getUsers )
  } catch ( error ) {
    res.status( 500 ).json( { message: 'Error getting all users', error: error.message } );
  }
} )

// Get a single user:
const getaUser = expressAsyncHandler( async ( req, res ) => {
  const { id } = req.params;
  try {
    const getaUser = await User.findById( id );
    res.json( getaUser )
  } catch ( error ) {
    res.status( 500 ).json( { message: 'Error getting user', error: error.message } );
  }
} )

// Delete user:
const deleteaUser = expressAsyncHandler( async ( req, res ) => {
  const { id } = req.params;
  try {
    // Use Mongoose's deleteOne method to delete the user by ID
    const result = await User.findByIdAndDelete( id );

    // Check the result to see if the user was deleted
    if ( result.deletedCount === 0 ) {
      return res.status( 404 ).json( { message: 'User not found' } );
    }

    res.json( { message: 'User deleted successfully' } );
  } catch ( error ) {
    res.status( 500 ).json( { message: 'Error deleting user', error: error.message } );
  }
} );

// Update user:
const updateUser = expressAsyncHandler( async ( req, res ) => {
  const { id } = req.params;
  const { firstname, lastname, email, mobile } = req.body
  try {
    const updateUser = await User.findByIdAndUpdate( id, req.body, { new: true } );
    return res.status( 200 ).json( {
      message: "Updated user",
      data: updateUser
    } );
  } catch ( error ) {
    res.status( 500 ).json( { message: 'Error Updating user', error: error.message } );
  }
} )

// Export the handler to be used in other files
module.exports = { createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateUser };
