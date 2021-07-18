const Promise = require('bluebird');
const mysql = require('mysql');
require('dotenv').config();
const connection = Promise.promisifyAll(
    mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        dateStrings: process.env.DB_DATESTR,
    })
);

exports.connection = connection;
