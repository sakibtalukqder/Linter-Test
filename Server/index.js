const express = require('express');
const app = express();
app.use(express.json());


// Require .ENV 
const dotenv = require('dotenv');
dotenv.config();

// Require & use Cors 
const cors = require('cors');
app.use(cors());

const server = require('http').createServer(app);
server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
}

// Connect to mongo DB
const mongoose = require('mongoose')

const ConnectDb = async() => {
    await mongoose.connect(process.env.Url)
    .then(()=>{
        console.log(`Connected To The Database ${process.env.Url}`);
    }).catch((Error)=>{
        console.log(Error);
    })
}
ConnectDb();

// import Router 
const router = require('./DataBase/router')
app.use('/route',router)

//Running Port

app.get('/',(req,res) => {
    res.send("Post request")
})

app.listen(process.env.Port,() => {
    console.log(`Express Port Running at ${process.env.Port}`);
});