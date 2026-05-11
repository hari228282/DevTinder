const express = require("express");
// const { AdminAuthMiddleware, UserAuthMiddleware } = require("./middlewares/auth");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const app = express();  

// app.use("/user", (req, res, next) => {
//     // Route handler for /user
//      next(); // Call the next middleware or route handler
//     res.send("Route handler for /user");
//     console.log("Handling the route user");
       
    
// }, (req, res) => {
//     res.send("Second handler for /user");
//     console.log("Handling the route user2");
    
// });

// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// });


// app.use("/dashboard", (req, res) => {
//     res.send("Hello, World! for DEVTINDER DASHBOARD");
// });


// app.use("/dashboard2/yes", (req, res) => {
//     res.send("Hello, World! for DEVTINDER DASHBOARD2 yes yes");
// });

// app.use("/dashboard2", (req, res) => {
//     res.send("Hello, World! for DEVTINDER DASHBOARD2 yes");
// });



// app.use("/", (req, res) => {
//     res.send("Hello, World! for DEVTINDER");
// });

// // todo GET /user => It checks all the app.xxx("matching route") functions
// // todo GET /user => middlware chain => request handler => response
// app.use("/", (req, res, next) => {
//     // res.send("Handling the route /");
//     next(); // Call the next middleware or route handler
// });

// app.get("/user", (req, res, next) => {
//     // res.send("Hello, World! for DEVTINDER USER");
//     console.log("Handling the route user 1");
//     // next(); // Call the next middleware or route handler
// });
// app.get("/user", (req, res, next) => {
//     res.send("Hello, World! for DEVTINDER USER2");
//     console.log("Handling the route user 2");
//     next(); // Call the next middleware or route handler
// });

// // todo Handle Auth for only admin routes for all GET POST PUT DELETE PATCH requests starting with /admin
// app.use("/admin", AdminAuthMiddleware) // This will match all HTTP methods for routes starting with /admin

// app.post("/user/login", (req, res) => {
//     res.send("user logged in successfully");
// });

// app.get("/user/data", UserAuthMiddleware, (req, res) => {
//     res.send("User data");
// });

// app.get("/admin/getAllData", (req, res) => {
//     // Logic to fetch all data for admin
//     // Check if the request is authorized for admin access
//     // const token = "xyz123"
//     // const isAdminAuthorized = token === "xyz"; // Example authorization check
//     // if (isAdminAuthorized) {
//     //   res.send("Admin data");
//     // }
//     // else {
//     //     res.status(401).send("Unauthotized Access");
//     // }
//    res.send("Admin all data");
// });

// app.get("/admin/deleteUser", (req, res) => {
//     // Logic to delete a user for admin
//     // Check if the request is authorized for admin access
//     // const token = "xyz123"
//     // const isAdminAuthorized = token === "xyz"; // Example authorization check
//     // if (isAdminAuthorized) {
//     //   res.send("User deleted");
//     // }
//     // else {
//     //     res.status(401).send("Unauthotized Access");
//     // }
//    res.send("User deleted");
// });


// app.use("/", (err, req, res, next) => {
//     if(err) {
//         // Log the error for debugging purposes
//         console.error("Error occurred:", err);
//         res.status(500).send("Internal Server Error: " + err.message);  
//     }
// });

// app.get("/getUserData", (req, res) => {
//     // Logic to DB CALL AND GET THE DATA
//     try {
//        throw new Error("sdfghj");
//     res.send("User data");
//     }
//     catch(err) {
//      res.status(500).send("Some error occurred while fetching user data: " + err.message);
//     }
    
// });

// app.use("/", (err, req, res, next) => {
//     if(err) {
//         // Log the error for debugging purposes
//         console.error("Error occurred:", err);
//         res.status(500).send("Internal Server Error: " + err.message);  
//     }
// });

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", async (req, res) => {
    // Logic to create a new user in the database
    const user = new UserModel(req.body);
    
    // const user = new UserModel({
    //     FirstName: "Hari",
    //     LastName: "Om",
    //     Email: "hari@example.com",
    //     Password: "password123",
    //     age: 24,
    //     gender: "Male",
    // })

    try {
          await user.save();
    res.send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Internal Server Error: " + err.message);
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

// todo Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body._id;

    try {
        const user = await UserModel.findById({ _id: userEmail });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    }
    catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal Server Error: " + err.message);
    }

    // try {
    //     const user = await UserModel.findOne({ Email: userEmail });
    //     if (!user) {
    //         return res.status(404).send("User not found");
    //     }
    //     res.send(user);
    // }
    // catch (err) {
    //     console.error("Error fetching user:", err);
    //     res.status(500).send("Internal Server Error: " + err.message);
    // }

//    try {
//   const user = await UserModel.find({ Email: userEmail });
//   if (user.length === 0) {
//     return res.status(404).send("User not found");
//   }
//   else {
//     res.send(user);
//   }
//    } 
//    catch (err) {
//     console.error("Error fetching user:", err);
//     res.status(500).send("Internal Server Error: " + err.message);
//    }
}) 

// TODO Feed API - GET /feed - get all the users from the database
app.get("/feed", async(req, res) => {
  try {
        const users = await UserModel.find({});
        res.send(users);
  } 
  catch (err) {
    console.error("Error fetching feed:", err);
    res.status(500).send("Internal Server Error: " + err.message);
  }  
})

//todo DELETE /user - delete a user by id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        // const deletedUser = await UserModel.findByIdAndDelete({ _id: userId });
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Internal Server Error: " + err.message);
    }
})

// TODO Update a user from the database - PATCH
app.patch("/user", async (req, res) => {
    const userId = req.body._id;
    const data = req.body;
    console.log(data);

    try {
        const updatedUser = await UserModel.findByIdAndUpdate({_id: userId}, data, { 
            returnDocument: "before",
            runValidators: true,
         });
        console.log(updatedUser);
        
        res.send("User updated successfully");
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
    }
    catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("Updation Failed: " + err.message);
    }
})

connectDB().then(() => {
    console.log("Connected to MongoDB");
    app.listen(7777, () => {
    console.log("Server is running on port 7777");
});
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


