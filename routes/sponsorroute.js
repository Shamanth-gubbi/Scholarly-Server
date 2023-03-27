const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const sponsorrouter = express.Router();
sponsorrouter.use(bodyParser.json());

sponsorrouter.route('/createSponsor')
.post(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));
    const user={
        //stuid: req.body.stuid,
        sponid: req.body.sponid,
        fname: req.body.fname,
        lname: req.body.lname,
        typeIS: req.body.typeIS,
        profession: req.body.profession,
        spaddress: req.body.spaddress,
        pincode: req.body.pincode,
        phone: req.body.phone,
        sppassword:req.body.sppassword,
        emailid: req.body.emailid
        }
        const [uid]= await db.query(`SELECT * FROM student WHERE emailid="${user.emailid}"`);

        if(uid.length != 0){
            res.statusCode = 409;
            res.setHeader('Content-Type', 'text/json');
            res.send("User already exists");
            res.json({"status":"false"});
        }
        else {

            db.query(`INSERT INTO sponsor (fname, lname, typeIS, profession, spaddress, pincode, phone, sppassword, emailid) 
            VALUES ( "${user.fname}", "${user.lname}", "${user.typeIS}", "${user.profession}", "${user.spaddress}", "${user.pincode}", "${user.phone}", "${user.sppassword}", "${user.emailid}");`);
            res.statusCode = 200;
            const [user1]= await db.query(`SELECT * FROM sponsor WHERE emailid="${user.emailid}"`);
            res.setHeader('Content-Type', 'text/json');
            res.json(user1);
            
        }

        //connection.end();
    
}
)
sponsorrouter.route('/login')
.post(async (req, res, next) => {
    const connection = await mysql.createConnection(config.get('db'));
    const user={
        
        sppassword:req.body.sppassword,
        emailid: req.body.emailid,
        
        }
    
    const [uname]= await db.query(`SELECT * FROM sponsor WHERE emailid="${user.emailid}" AND sppassword="${user.sppassword}"`);
        
    if(uname.length == 0){
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
    else if (uname[0].sppassword == user.sppassword ){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(uname[0]);
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }

})


  

sponsorrouter.route('/')
// .put( async (req,res,next) => {
//     const user = {sponid: req.body.user_id,
//         emailid: req.body.user_email
//         }
                
//     db.query(`UPDATE sponsor SET emailid = "${user.emailid}" where sponid = "${user.sponid}";`);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/json');
//     res.json(user);    
// })
.get(async (req, res, next) => {
    try {
        const connection = await mysql.createConnection(config.get('db'));
        const [rows, fields] = await connection.execute('SELECT * FROM sponsor;');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rows);
        //connection.end();
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