const User=require('../models/user')
const jwt=require('jsonwebtoken')
const registerUser=async(req,res)=>{
    const user=req.body
    console.log(user)
    user.role='user'
    try{
        const newUser=await User.create(user)
        res.json(newUser)
    }catch(error){
        console.log(error)
    }

}
const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        let user=await User.findOne({'email':email,'password':password})
        if(!user)
            res.status(401).json({'message':'email/password incorrect...'})
        else{
            const {email,firstname,role,_id}=user;
            const token=jwt.sign({email,firstname,role,_id},process.env.JSON_SECRETKEY,{expiresIn:'180s'})
            res.status(200).json(token);
        }
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports={registerUser,login}