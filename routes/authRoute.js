// Import required packages and modules
const express = require( 'express' ); // Express.js for building the router
const { createUser, loginUserCtrl, getAllUsers, getaUser, deleteaUser, updateUser } = require( '../controller/userCtrl' ); // Controller function for user registration
const { authMiddleware } = require( '../middlewares/authMiddleware' )

// Create an instance of the Express router
const router = express.Router();

// Register Route: Handle POST requests to '/api/user/register'
router.post( '/register', createUser );

router.post( '/login', loginUserCtrl );

router.get( '/all-users', getAllUsers );

router.get( '/:id', authMiddleware, getaUser )

router.delete( '/:id', deleteaUser ).put( '/:id', updateUser );

// router.delete( '/:id', deleteaUser );

// Export the router to be used in other files
module.exports = router;


// I have to create nodejs server and deploy it on heroku.