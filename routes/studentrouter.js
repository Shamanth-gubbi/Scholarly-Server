const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const studentrouter = express.Router();
studentrouter.use(bodyParser.json());


studentrouter.route('/createStudent')
.post(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));
    const user={
        //stuid: req.body.stuid,
        fname: req.body.fname,
        lname: req.body.lname,
        staddress: req.body.staddress,
        pincode: req.body.pincode,
        phone: req.body.phone,
        stupassword:req.body.stupassword,
        emailid: req.body.emailid,
        dob:req.body.dob,
        cur_qual: req.body.cur_qual,
        basic_qual: req.body.basic_qual,
        master_qual:req.body.master_qual,
        other_qual: req.body.other_qual,
        stresume: req.body.stresume,
        photo: req.body.photo
        }
        const [uid]= await db.query(`SELECT * FROM student WHERE emailid="${user.emailid}"`);

        if(uid.length != 0){
            res.statusCode = 409;
            res.setHeader('Content-Type', 'text/json');
            res.send("User already exists");
            res.json({"status":"false"});
        }
        else {
            db.query(`INSERT INTO student (fname, lname, staddress, pincode, phone, stupassword, emailid, dob, cur_qual, basic_qual, master_qual, other_qual, stresume, photo) 
            VALUES ( "${user.fname}", "${user.lname}", "${user.staddress}", "${user.pincode}", "${user.phone}", "${user.stupassword}", "${user.emailid}", "${user.dob}", "${user.cur_qual}", "${user.basic_qual}", "${user.master_qual}", "${user.other_qual}", "${user.stresume}", "${user.photo}");`);
            res.statusCode = 200;
            const [user1]= await db.query(`SELECT * FROM student WHERE emailid="${user.emailid}"`);
            res.setHeader('Content-Type', 'text/json');
            res.json(user1);
            
        }

        //connection.end();
    
}
)

studentrouter.route('/login')
.post(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));
    const user={
        
        stupassword:req.body.stupassword,
        emailid: req.body.emailid,
        
        }
    
    const [uname]= await db.query(`SELECT * FROM student WHERE emailid="${user.emailid}" AND stupassword="${user.stupassword}"`);
        
    if(uname.length == 0){
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
    else if (uname[0].stupassword == user.stupassword ){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(uname[0]);
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }

})

studentrouter.route('/:emailid')
.get(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));

    const [uid]= await db.query(`SELECT * FROM student WHERE emailid="${req.params.emailid}";`);

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
        res.json(uid[0]);
        
    }

    //connection.end();
    
})
.post(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));
    const user={
        //stuid: req.body.stuid,
        fname: req.body.fname,
        lname: req.body.lname,
        staddress: req.body.staddress,
        pincode: req.body.pincode,
        phone: req.body.phone,
        stupassword:req.body.stupassword,
        emailid: req.body.emailid,
        dob:req.body.dob,
        cur_qual: req.body.cur_qual,
        basic_qual: req.body.basic_qual,
        master_qual:req.body.master_qual,
        other_qual: req.body.other_qual,
        stresume: req.body.stresume,
        photo: req.body.photo
        }
    
    const [uid]= await db.query(`SELECT * FROM student WHERE emailid="${user.emailid}"`);

    if(uid.length == 0){
        res.statusCode = 409;
        res.setHeader('Content-Type', 'text/json');
        res.send("User does not exists");
        res.json({"status":"false"});
    }
    else {
        db.query(`UPDATE student SET fname="${user.fname}", lname="${user.lname}", staddress="${user.staddress}", pincode="${user.pincode}", phone="${user.phone}", stupassword="${user.stupassword}", emailid="${user.emailid}", dob="${user.dob}", cur_qual="${user.cur_qual}", basic_qual="${user.basic_qual}", master_qual="${user.master_qual}", other_qual="${user.other_qual}", stresume="${user.stresume}", photo="${user.photo}" WHERE emailid="${user.emailid}";`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(user);
        
    }

    //connection.end();
    
})   

studentrouter.route('/')
.get(async (req, res, next) => {
    
    try {
        const connection = await mysql.createConnection(config.get('db'));
        const [rows, fields] = await connection.execute('SELECT * FROM student;');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
        //connection.end();
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