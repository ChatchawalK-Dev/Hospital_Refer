const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "database-3.c7eo8sg48bsk.ap-southeast-1.rds.amazonaws.com",
    port: 3306,
    user: "root",
    password: "ieHIDPaDM2CAKE28gsVg",
    database: "hospital_project",
});

module.exports = pool;
