const express=require('express')

const { registerUser,login}=require('../controller/userscontroller')
const multer = require('multer')
const userrouter=express.Router()

userrouter.post('/register',registerUser)

userrouter.post('/login',login)
const storage =multer.diskStorage({
    destination:function (req,file,cb){//cb is call back funciotn
   cb(null,'static/images')//directory where uploaded files will be stored
    },
    filename:function (req,file,cb){
        cb(null,file.originalname)//set the file name to its orginal name
    }
 });
 const upload =multer({storage:storage});
 userrouter.post('/upload',upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send('no files were uploaded');
    }
    res.json(req.file)
 });

module.exports=userrouter