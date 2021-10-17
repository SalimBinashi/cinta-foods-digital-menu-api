require("dotenv").config();
// create express
const express = require("express");
// cors
const cors = require("cors");

// body parser
const bodyParser = require("body-parser");
// cookie parser
const cookieParser = require("cookie-parser");
// session
const session = require("express-session");
// initialize express app
const app = express();
const mealsRouter = require("./api/meals/meals.router");
const tablesRouter = require("./api/tables/tables.router");


// convert JSON object to Javascript
app.use(express.json());
// enable cookies in cors
app.use(cors());

// {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PATCH"],
//     credentials: true
// }

// use cookie parser
app.use(cookieParser());
// use body parser
app.use(bodyParser.urlencoded({extended: true}));

// initialize session
app.use(
    session({
        key: "userKey",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60,
        },
    })
);
//listen
app.use("/", mealsRouter);
app.use("/tables", tablesRouter);

// listen to a port
app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on port: ",process.env.APP_PORT);
});