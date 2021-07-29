//import create service
const { create, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require("./user.service");

//import bcrypt
const { genSaltSync, hashSync, compareSync } = require("bcrypt")

// create the JSON web token
const { sign } = require("jsonwebtoken");
// create export module
module.exports = {
    // create a user controller
    createUser: (req, res) => {
        const body  = req.body;
        // hash the password
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        /**
         * Call the create service which takes two params:
         * 1. body
         * 2. callback function defined in user.service
         * 
         * Recall: callback function requires two params:
         * i. error
         * ii. results
         */
        create(body, (err, results) => {
            // if error is got
            if(err) {
                // log error to console
                console.log(err);
                // return an internal server error
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            // if no error return success
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    // get a specific user controller
    getUserById: (req, res) => {
        // extract id
        const id = req.params.id;
        // call the getuserbyId service
        getUserById(id, (err, results) => {
            // if an error log the error
            if(err) {
                console.log(err);
                return;
            }
            // if user does not exist
            if(!results) {
                return res.json({
                    success: 0,
                    message: "User not found"
                });
            }
            // if user exists
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    // get a specific user controller
    getUsers: (req, res) => {
         // call the getuser service
         getUsers((err, results) => {
            // if an error log the error
            if(err) {
                console.log(err);
                return;
            }
            // if user exists
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    // update user
    updateUser: (req, res) => {
        // pick the data from the body
        const body = req.body;
        // encrypt data
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        // update user details
        updateUser(body, (err, results) => {
            // handle the callback
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "update successful"
            });
        });
    },
    // delete user
    deleteUser: (req, res) => {
        // pick the data from the body
        const body = req.body;
        
        // update user details
        deleteUser(body, (err, results) => {
            // handle the callback
            if(err) {
                console.log(err);
                return;
            }
            // if user does not exist
            if(!results) {
                return res.json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successful"
            });
        });
    },
    login: (req, res) => {
        // pick user input
        const body = req.body;
        // call the service
        getUserByEmail(body.email, (err, results) => {
            // return the error if noted
            if (err) {
                console.log(err);
            }
            // if user does not exist
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            // if user exists, check for password
            const result = compareSync(body.password, results.password);
            // if password is correct
            if (result) {
                // undefine the password to prevent it from being sent with the token
                results.password = undefined;
                // create and intialize the web token
                const jsontoken = sign({ result: results}, process.env.JSWBTOKEN, 
                    { expiresIn: "1h" });
                // create session
                req.session.user = result  
                    // login user
                return res.json({
                    success: 1,
                    message: "Logged in successfully",
                    token: jsontoken
                });  
                // else if incorrect password  
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    }
}
