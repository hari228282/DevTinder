const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const UserAuthMiddleware = async (req, res, next) => {

 try { // Read the token from the req cookies
   const cookies = req.cookies;
   const { token } = cookies
   if(!token) {
    throw new Error("Token is not valid!!!!!")
   }

   // validate the cookies
    const decodedObj = await jwt.verify(token, "DEV@Tinder$900");

    
   // Find the user
   const {_id} = decodedObj;
   const user = await UserModel.findById(_id);

   if(!user) {
    throw new Error( "user not found");
   }
   req.user = user
   next();
 }
   catch (err) {
     res.status(400).send("ERROR: "+ err.message);
   }
};


module.exports = {
    UserAuthMiddleware,
}