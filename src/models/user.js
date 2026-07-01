const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
    },
    Password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong enough. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.");
            }
        }
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value.toLowerCase())) {
                throw new Error("Gender must be either 'male', 'female', or 'other'.");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL format");
            }
        }
    },
    about: {
        type: String,
        default: "This is default about the user."
    },
    skills: {
        type: [String],
        default: ["JavaScript", "Node.js", "React"]
    },
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign(
        {_id: user._id}, 
        "DEV@Tinder$900",
         { expiresIn: "1d"});

         return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.Password

    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isValidPassword;
}

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
// module.exports = mongoose.model("user", userSchema);