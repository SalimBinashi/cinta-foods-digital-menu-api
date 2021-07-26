// import createPool
const {createPool} = require("mysql");

/** initialize the pool of connections: These are
 *the details of your connection */ 

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

// export the module
module.exports = pool;
