//import create service
const {
  getMains,
  getDrinks,
  getSides,
  makeOrder
} = require("./meals.service");

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

  // make order controller
  makeOrder: (req, res) => {
    const body  = req.body;
    /**
     * Call the create service which takes two params:
     * 1. body
     * 2. callback function defined in user.service
     * 
     * Recall: callback function requires two params:
     * i. error
     * ii. results
     */
     makeOrder(body, (err, results) => {
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
 
};
