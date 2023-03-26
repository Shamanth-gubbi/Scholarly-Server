const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const applicantsrouter = express.Router();
applicantsrouter.use(bodyParser.json());

applicantsrouter.route('/:id')
.get(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));
    const [uid]= await db.query(`SELECT scholarship.sch_id,title,shdescription,no_of_scholarships,shamount,deadline,eligibility,postdate,other_support,
    related_link,NSRG,category FROM scholarship,application where 
    scholarship.sch_id=application.sch_id AND  application.sch_id="${req.params.id}";`);
    if(uid.length == 0){
        res.statusCode = 409;
        res.setHeader('Content-Type', 'text/json');
        res.send("User does not exists");
        res.json({"status":"false"});
    }
    else {
        //db.query(`UPDATE student SET fname="${user.fname}", lname="${user.lname}", staddress="${user.staddress}", pincode="${user.pincode}", phone="${user.phone}", stupassword="${user.stupassword}", emailid="${user.emailid}", dob="${user.dob}", cur_qual="${user.cur_qual}", basic_qual="${user.basic_qual}", master_qual="${user.master_qual}", other_qual="${user.other_qual}", stresume="${user.stresume}", photo="${user.photo}" WHERE emailid="${user.emailid}";`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(uid);
        
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

module.exports = applicantsrouter;