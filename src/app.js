const { json } = require("express");
const cors = require("cors");
const express = require("express");
const app = express();
require ('dotenv').config();
const morgan = require('morgan');
const router = require("./routes");
const session = require('express-session');


app.use(cors());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
})
);

app.use(json());
app.use(morgan('dev'));
app.use('/api', router)

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server up and running on port:', process.env.APP_PORT)
})
