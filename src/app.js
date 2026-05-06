const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// });

app.use("/devtinder", (req, res) => {
    res.send("Hello, World! for DEVTINDER");
});

app.use("/dashboard", (req, res) => {
    res.send("Hello, World! for DEVTINDER DASHBOARD");
});

app.use("/dashboard2", (req, res) => {
    res.send("Hello, World! for DEVTINDER DASHBOARD2");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});