// Import required packages and modules
const mongoose = require( 'mongoose' ); // Mongoose for interacting with MongoDB
const bcrypt = require( 'bcrypt' ); // Bcrypt for hashing passwords

// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema( {
  firstname: {
    type: String,
    required: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  },
  cart: {
    type: Array,
    default: []
  },
  address: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  } ],
  wishlist: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  } ],
},
  {
    timestamps: true,
  }
);

// Middleware: Execute before saving a user to hash the password
userSchema.pre( 'save', function ( next ) {
  // Generate a salt and hash the password before saving
  const salt = bcrypt.genSaltSync( 10 );
  this.password = bcrypt.hashSync( this.password, salt );
  next();
} );

userSchema.methods.isPasswordMatched = async function ( enteredPassword ) {
  return await bcrypt.compare( enteredPassword, this.password )
}

// Export the model to be used in other files
module.exports = mongoose.model( 'User', userSchema );
