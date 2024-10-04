const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const path = require('path');
require('dotenv').config()
const morgan= require('morgan')

const connectDB=require('./util/database.js')
const userrouter = require('./router/userrouter.js')
const bookRouter = require('./router/bookrouter.js')
const cartrouter =require('./router/cartrouter.js')
const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('short'))
app.use(express.static('static'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user',userrouter)
app.use('/books',bookRouter)
app.use('/cart',cartrouter)
const start=async()=>{
    try{
        const connect=await connectDB();
        console.log(connect)

        app.listen(8000,()=>{
            console.log('The server started at the port number 8000')
        })
    }catch(err){
    console.log(err);
    }
}
start();