const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const sponsorrouter = express.Router();
sponsorrouter.use(bodyParser.json());

sponsorrouter.route('/')
.put( async (req,res,next) => {
    const user = {sponid: req.body.user_id,
        emailid: req.body.user_email
        }
                
    db.query(`UPDATE sponsor SET emailid = "${user.emailid}" where sponid = "${user.sponid}";`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.json(user);    
})
.get(async (req, res, next) => {
    try {
        const connection = await mysql.createConnection(config.get('db'));
        const [rows, fields] = await connection.execute('SELECT * FROM sponsor;');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
        connection.end();
    } catch (err) {
        next(err);
    }
})
;

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

module.exports = sponsorrouter;