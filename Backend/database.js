const mysql = require("mysql2");

const pool = mysql.createPool({
    host:"localhost",
    user: "root",
    database:"categories_assignment",
    password: "",
    port: 3306,
});

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '', // enter your Laragon MySQL password here
//     database: 'database_name' // enter the name of your database here
//   });

module.exports = pool.promise();