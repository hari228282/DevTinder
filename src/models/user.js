const mongoose = require('mongoose');

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
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],

    },
    Password: {
        type: String,
        required: true
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
        default: "https://www.w3schools.com/howto/img_avatar.png"
    },
    about: {
        type: String,
        default: "A passionate developer with expertise in JavaScript and a love for building web applications."
    },
    skills: {
        type: [String],
        default: ["JavaScript", "Node.js", "React"]
    },
}, { timestamps: true });

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
// module.exports = mongoose.model("user", userSchema);