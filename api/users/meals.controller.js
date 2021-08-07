//import create service
const {
  getMains,
  getDrinks,
  getSides,
  updateTableStatus,
  getTableByTableNumber,
  updateLoginStatus,
  getAll
} = require("./meals.service");

//import bcrypt
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

// create the JSON web token
const { sign } = require("jsonwebtoken");
// create export module
module.exports = {

 
  // get mains
  getMains: (req, res) => {
    // call the get mains service
    getMains((err, results) => {
      // if an error log the error
      if (err) {
        console.log(err);
        return;
      }
      // if user exists
      return res.json({
        mains: results,
      });
    });
  },
  // get sides
  getSides: (req, res) => {
    // call the getSides service
    getSides((err, results) => {
      // if an error log the error
      if (err) {
        console.log(err);
        return;
      }
      // if sides exists
      return res.json({
        sides: results,
      });
    });
  },
  // get drinks
  getDrinks: (req, res) => {
    // call the get drinks service
    getDrinks((err, results) => {
      // if an error log the error
      if (err) {
        console.log(err);
        return;
      }
      // if drink exists
      return res.json({
        drinks: results,
      });
    });
  },
  // update table
  updateTableStatus: (req, res) => {
    // pick the data from the body
    const body = req.body;
    // update table details
    updateTableStatus(body, (err, results) => {
      // handle the callback
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "update successful",
      });
    });
  },
  login: (req, res) => {
    // pick user input
    const body = req.body;
    // call the service
    getTableByTableNumber(body.table_number, (err, results) => {
      // return the error if noted
      if (err) {
        console.log(err);
      }
      // if table does not exist
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid table number or password",
        });
      }
      // if table exists, check for password
      const result = compareSync(body.password, results.password);
      // if password is correct
      if (result) {
        // undefine the password to prevent it from being sent with the token
        results.password = undefined;
        // create and intialize the web token
        const jsontoken = sign({ result: results }, process.env.JSWBTOKEN, {
          expiresIn: "1h",
        });
        // create session
        req.session.user = result;
        // login table
        updateLoginStatus(body.table_number);
        return res.json({
          success: 1,
          message: "Logged in successfully",
          token: jsontoken,
        });

        // else if incorrect password
      } else {
        return res.json({
          success: 0,
          message: "Invalid table number or password",
        });
      }
    });
  },
};
