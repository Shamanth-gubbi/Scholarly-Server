const http = require('http');
const morgan = require('morgan');
const mysql = require("mysql2/promise");
const cors = require("cors");
const express = require("express");

const config = require('config');


const hostname = config.get('app.hostname');
const port = config.get('app.port');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const applicantsrouter = require('./routes/applicants');
app.use('/applicants',applicantsrouter);

const ssrouter = require('./routes/ssrouter');
app.use('/scholarship',ssrouter);

const studentrouter = require('./routes/studentrouter');
app.use('/students',studentrouter);

const sponsorrouter = require('./routes/sponsorroute');
app.use('/sponsors',sponsorrouter);


const applicationrouter = require('./routes/application');
app.use('/application',applicationrouter);

const server = http.createServer(app);
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

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});