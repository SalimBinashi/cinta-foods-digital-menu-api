//import create service
const {
  getMains,
  getDrinks,
  getSides
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
 
};
