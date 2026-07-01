const express = require('express');
const bycrypt = require('bcrypt');
const { ValidationSignupData } = require("../utils/validation.js");
const UserModel = require("../models/user.js");


const router = express.Router();

router.post("/signup", async (req, res) => {

    try {

    // todo Validation of data
    ValidationSignupData(req);

    const { FirstName, LastName, Email, Password} = req.body;

    //todo Encrypt the password
    const PasswordHash = await bycrypt.hash(Password, 10);

    // Logic to create a new user in the database
    const user = new UserModel({
        FirstName,
        LastName,
        Email,
        Password: PasswordHash,
    });
    
    // const user = new UserModel({
    //     FirstName: "Hari",
    //     LastName: "Om",
    //     Email: "hari@example.com",
    //     Password: "password123",
    //     age: 24,
    //     gender: "Male",
    // })

    
          await user.save();
    res.send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send(" Error: " + err.message);
    }

    // const newUser = new UserModel(userObj);
    // newUser.save()
    //     .then(() => {
    //         res.status(201).send("User created successfully");
    //     })
    //     .catch((err) => {
    //         console.error("Error creating user:", err);
    //         res.status(500).send("Internal Server Error: " + err.message);
    //     });
});


router.post("/login", async (req, res) => {
    try {
      const { Email, Password } = req.body;
      const user = await UserModel.findOne({ Email: Email });
      if (!user) {
        return res.status(404).send("Invalid Credentials");
      }
      const IsPasswordValid = await user.validatePassword(Password);
      if (!IsPasswordValid) {
        return res.status(401).send("Invalid Credentials");
      }
      else {

        // Create a JWT Token
        const token = await user.getJWT();
        // console.log(token);
        

        // And Add token to cookie and send the response back to the server
        res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000)}); // cookie will be removed after 8 hours
        res.send("Login Successfull");
      }
        }
    catch (err) {
        res.status(500).send("Login Failed: "+ err.message);
    }
    
})

module.exports = router;