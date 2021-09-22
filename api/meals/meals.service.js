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

    //make order service
    postOrder: (data, callback) => {
        //create a query
        pool.query(
            `INSERT into orders(orders, table_number, total) VALUES(?,?,?)`,
            // init the data to be passed during runtime            
            [
                data.orders,
                data.table_number,
                data.total,
            ],
            // initialize the callback parameters
            (error, results, fields) => {
                // if an error is got return it in the callback
                if(error) {
                    return callback(error);
                }
                //else return the results
                return callback(null, results)
            }            
        );
    },
   
};