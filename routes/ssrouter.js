const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const ssrouter = express.Router();
ssrouter.use(bodyParser.json());

ssrouter.route('/')
.get(async (req, res, next) => {
    try {
        const connection = await mysql.createConnection(config.get('db'));
        const [rows, fields] = await connection.execute('SELECT * FROM scholarship;');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
        connection.end();
        
    } catch (err) {
        next(err);
    }
})
.post( async (req, res, next) => {
    const rest = {  sch_id: req.body.sch_id,
                    sponid: req.body.sponid,
                    title: req.body.title,
                    shdescription: req.body.shdescription,
                    no_of_scholarships: req.body.no_of_scholarships,  
                    shamount: req.body.shamount,
                    deadline: req.body.deadline,
                    eligibility: req.body.eligibility,
                    postdate: req.body.postdate,
                    other_support: req.body.other_support,
                    related_link: req.body.related_link
                }
                
    // const [rname] = await db.query(`SELECT * FROM scholarship WHERE rest_id = "${rest.sch_id}";`);

            db.query(`INSERT INTO scholarship (sch_id, sponid, title, shdescription, no_of_scholarships, shamount, deadline, eligibility, other_support, related_link)
             VALUES ("${rest.sch_id}", "${rest.sponid}", "${rest.title}", "${rest.shdescription}", "${rest.no_of_scholarships}", "${rest.shamount}", "${rest.deadline}", "${rest.eligibility}", "${rest.other_support}", "${rest.related_link}");`);
            res.json("Scholarship added successfully");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/json');
            //res.json(dish);
            
});






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

module.exports = ssrouter;