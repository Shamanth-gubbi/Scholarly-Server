const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const studentrouter = express.Router();
studentrouter.use(bodyParser.json());

studentrouter.route('/')
.get(async (req, res, next) => {
    try {
        const connection = await mysql.createConnection(config.get('db'));
        const [rows, fields] = await connection.execute('SELECT * FROM student;');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
        connection.end();
    } catch (err) {
        next(err);
    }
})

async function main(){
    db = await mysql.createConnection({
      host: config.get('db.host'),
      user: config.get('db.user'),
      password: config.get('db.password'),
      database: config.get('db.database'),
      timezone: config.get('db.timezone'),
      charset: config.get('db.charset')
    });  
}
main();

module.exports = studentrouter;