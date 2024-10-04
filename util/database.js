const mongoose=require('mongoose')
const connectDB=()=>{
  mongoose.set('debug',true)
  return mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
}
module.exports=connectDB