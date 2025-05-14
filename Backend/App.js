const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors=require('cors');
app.use(cors());
app.options('*',cors());

const companyjob=require('./Routers/GetListCompany');
const admin=require('./Routers/Admin')
const user=require('./Routers/UserRegister');
const Company=require('./Routers/CompanyRegister');




app.use(bodyParser.json());
app.use(morgan('tiny'));

const api = process.env.API_URL;

console.log("Using companyjob router");
app.use(`${api}/home`,companyjob);
app.use(`${api}/admin`,admin);
app.use(`${api}/user`,user);
app.use(`${api}/company`,Company);





// Database connection
mongoose.connect(process.env.db_connection, {
    dbName:'JobPortal',
    connectTimeoutMS: 30000,  
    socketTimeoutMS: 45000
    
  })
  .then(() => {
    console.log('Db is Connected......');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

  // Server connection
app.listen(8080, () => {
    console.log(api);
    console.log('Port running on 8080');
  });
