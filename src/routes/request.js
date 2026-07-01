const express = require('express');
const { UserAuthMiddleware } = require("../middlewares/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", UserAuthMiddleware, async (req, res) => {
   try {
    const user = req.user;
    // Sending a Connection Request
     console.log("Sending connection request to the new user");
    
    res.send("Sending the Connection Request by " + user.FirstName)
   }
   catch(err) {
    res.status(400).send("Error", + err.message)
   }
})

module.exports = requestRouter;