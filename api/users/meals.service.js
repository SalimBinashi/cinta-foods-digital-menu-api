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
    // login service
    getTableByTableNumber: (table_number, callback) => {
        pool.query(`SELECT * FROM tables where table_number=?`,
        [table_number],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            
            return callback(table_number, results[0]);
        })
    },
    // update table details
    updateTableStatus: (data, callback) => {
        //create a query
        pool.query(
            `UPDATE tables set status=? WHERE table_number=?`,
            // init the data to be passed during runtime            
            [
                data.status,
                data.table_number
            ],
            // initialize the callback parameters
            (error, results) => {
                // if an error is got return it in the callback
                if(error) {
                    return callback(error);
                }
                //else return the results
                return callback(null, results[0])
            }            
        );
    },

    // update table login status
    updateLoginStatus: (table_number, callback) => {
        var loginStatus = 1;
        //create a query
        pool.query(
            `UPDATE tables set login_status=? WHERE table_number=?`,
            // init the data to be passed during runtime            
            [
                loginStatus,
                table_number
            ],
            // initialize the callback parameters
            (error, results) => {
                // if an error is got return it in the callback
                if(error) {
                    return callback(error);
                }
                //else return the results
                return callback(null, results[0])
            }            
        );
    },
};