// import pool from the database file

const pool = require("../../config/database");

// export service as a module to be used in other files
module.exports = {

    // get all Mains
    getMains: callback => {
        // create query
        pool.query(
            `SELECT DISTINCT name, price, description FROM mains`,
        [],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            return callback(null, results);
        }
        );
    },
    // get all drinks
    getDrinks: callback => {
        // create query
        pool.query(
            `SELECT DISTINCT name, price, category FROM drinks`,
        [],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            return callback(null, results);
        }
        );
    },

    // get all Sides
    getSides: callback => {
        // create query
        pool.query(
            `SELECT DISTINCT name, price FROM sides`,
        [],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            return callback(null, results);
        }
        );
    },
   
};