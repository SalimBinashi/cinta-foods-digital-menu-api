// import pool from the database file

const pool = require("../../config/database");

// export service as a module to be used in other files
module.exports = {
    // create method
    create: (data, callback) => {
        //create a query
        pool.query(
            `INSERT into users(firstName, lastName, email, password) VALUES(?,?,?,?)`,
            // init the data to be passed during runtime            
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
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
    // get all users
    getUsers: callback => {
        // create query
        pool.query(
            `SELECT * FROM users`,
        [],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            return callback(null, results);
        }
        );
    },
    // get a specific user
    getUserById: (id, callback) => {
        // create query
        pool.query(`SELECT * FROM users WHERE id = ?`,
        [id],
        // initialize the callback parameters
        (error, results, fields) => {
            if(error) {
             // if an error is got return it in the callback
                return callback(error);
            }
            //else return the results
            return callback(null, results[0]);
        }
        );
    },
    // login service
    getUserByEmail: (email, callback) => {
        pool.query(`SELECT * FROM users where email=?`,
        [email],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            
            return callback(email, results[0]);
        })
    },
    // update user details
    updateUser: (data, callback) => {
        //create a query
        pool.query(
            `UPDATE users set firstName=?, lastName=?, gender=?, email=?, password=?, phoneNumber=? WHERE id=?`,
            // init the data to be passed during runtime            
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.phone_Number,
                data.id
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
    // delete user
    deleteUser: (data, callback) => {
        // create query
        pool.query(
            `DELETE FROM USERS WHERE id = ?`,
        [data.id],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }
            return callback(null, results[0]);
        }
        );
    }
};