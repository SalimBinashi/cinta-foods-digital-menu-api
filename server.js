require("dotenv").config();
// create express
const express = require("express");
// initialize express app
const app = express();
const userRouter = require("./api/users/user.router");


// convert JSON object to Javascript
app.use(express.json());

//listen
app.use("/api/users", userRouter);

// listen to a port
app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on port: ",process.env.APP_PORT);
});