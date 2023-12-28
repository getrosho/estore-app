const jwt = require( 'jsonwebtoken' );
const User = require( '../models/userModel' );
const expressAsyncHandler = require( 'express-async-handler' );


const authMiddleware = expressAsyncHandler( async ( req, res, next ) => {
  let token;
  if ( req?.headers?.authorization?.startsWith( 'Bearer' ) ) {
    token = req.headers.authorization.split( " " )[ 1 ]
    try {
      const decoded = jwt.verify( token, process.env.JWT_SECRET );
      const user = await User.findById( decoded?.id );
      res.user = user;
      next();
    } catch ( error ) {
      throw new Error( 'Token not authorized, Please login again' );
    }
  } else {
    throw new Error( 'There is no token attached to the header' );
  }
} )

module.exports = { authMiddleware };