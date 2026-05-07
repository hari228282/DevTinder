const AdminAuthMiddleware = (req, res, next) => {
    console.log("Admin auth is getting checked");
    
   const token = "xyz"
    const isAdminAuthorized = token === "xyz"; // Example authorization check
    if (!isAdminAuthorized) {
      res.status(401).send("Unauthorized Access");
    }
    else {
        next(); // Call the next middleware or route handler
    }
}

const UserAuthMiddleware = (req, res, next) => {
    console.log("User auth is getting checked");
    
   const token = "xyz"
    const isAdminAuthorized = token === "xyz"; // Example authorization check
    if (!isAdminAuthorized) {
      res.status(401).send("Unauthorized Access");
    }
    else {
        next(); // Call the next middleware or route handler
    }
}


module.exports = {
    AdminAuthMiddleware,
    UserAuthMiddleware,
}