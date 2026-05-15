const validator = require("validator");

 const ValidationSignupData = (req) => {
    const { FirstName, LastName, Email, Password} = req.body

    if(!FirstName || !LastName) {
        throw new Error("Name is not vaild");
    }
    else if(!validator.isEmail(Email)) {
        throw new Error("Invalid email format")
    }
    else if(!validator.isStrongPassword(Password)) {
        throw new Error("Password is not strong enough. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.");
    }
};

module.exports = {
    ValidationSignupData,
}