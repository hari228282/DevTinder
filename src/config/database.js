const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://hari228282_namaste_dev_user:tSQoL9a4kqdJqIP8@namastenode.rshquya.mongodb.net/devTinder");

};

module.exports = connectDB;
