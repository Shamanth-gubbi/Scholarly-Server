const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const applicantsrouter = express.Router();
applicantsrouter.use(bodyParser.json());

applicantsrouter.route('/:id')
.get(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));
    const [uid]= await db.query(`SELECT scholarship.sch_id,application.stuid,application.sponid,title,shdescription,no_of_scholarships,shamount,deadline,eligibility,postdate,other_support,
    related_link,NSRG,category FROM scholarship,application,sponsor where 
    sponsor.sponid=application.sponid AND
    scholarship.sch_id=application.sch_id AND  application.sponid="${req.params.id}";`);
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
applicantsrouter.route('/')
.post(async (req, res, next) => {
    const rest = {  sch_id: req.body.sch_id,
                    //stuid: req.body.stuid,
                    sponid: req.body.sponid,
                }   
    const [uid]= await db.query(`SELECT application.stuid, application.sch_id, application.sponid,
    emailid,
    fname,
    lname,
    staddress,
    pincode,
    phone,
    stupassword,
    emailid,
    dob,
    cur_qual,
    basic_qual,
    master_qual,
    other_qual,
    stresume,
    photo FROM application, student where student.stuid=application.stuid AND application.sch_id="${rest.sch_id}" AND application.sponid="${rest.sponid}";`);

    if(uid.length != 0){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        //res.send("User already exists");
        res.json([uid][0]);
    }
    else {
      
        res.statusCode = 404;
        //res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
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