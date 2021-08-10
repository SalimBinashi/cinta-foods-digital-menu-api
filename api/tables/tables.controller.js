// import the services
const {
  getTables,
  updateTableStatus,
  getTableByTableNumber,
  updateLoginStatus,
} = require("./tables.service");

//import bcrypt
const { compareSync } = require("bcrypt");

// create the JSON web token
const { sign } = require("jsonwebtoken");

// create the export module
module.exports = {
  //get all tables controller
  getTables: (req, res) => {
    // calling get all tables service
    getTables((error, results) => {
      // if an error occurs
      if (error) {
        console.log(err);
        return;
      }

      return res.json({
        tables: results,
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
      // checking to see if the table is already logged in
      if (results["login_status"] === 1) {
        return res.json({
          success: 0,
          message: "Table is already logged in",
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
