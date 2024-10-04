const mongoose = require('mongoose');
const cartItemSchema=new mongoose.Schema({
    bookId:{type:mongoose.Schema.Types.ObjectId, ref: 'Book'},
    quantity:{type:Number,default:1}
});

const cartSchema = new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId, //assume you have user authenticaton
    items: [cartItemSchema]
});

module.exports=mongoose.model('Cart',cartSchema)