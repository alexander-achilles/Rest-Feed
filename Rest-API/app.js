const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

require('dotenv').config();

const feedRoutes = require('./routes/feed');
const { Mongoose } = require('mongoose');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use((error,req,res,next)=>{
    console.log(error);
    const status= error.statusCode || 500;
    const message= error.message;
    res.status(status).json({message: message});
})

mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true,  useNewUrlParser: true  }).then(
    app.listen(8080,()=>{
    console.log("server is up on 8080");
})
)
.catch(err=>{console.log(err);})

