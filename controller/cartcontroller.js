const Cart=require('../models/cart');


//add to cart
exports.addToCart=async(req,res)=>{
    const {bookId,quantity}=req.body;
    const userId = req.user._id; //assume user is authentcated 

    let cart = await Cart.findOne({userId});

    if(!cart){
        cart=new Cart({userId,items:[]});

    }
    const itemIndex = cart.items.findIndex(item=>
        item.bookId.toString()===bookId);

        if(itemIndex>-1){
            //product exists in the caet,update the quantity
            cart.items[itemIndex].quantity += quantity;
        }else{
            //product does not exist in the cart ,update the quantity
            cart.items.push({bookId,quantity});
        }
        await cart.save();
        res.send('Book added to cart')

}

//view cart
exports.viewCart = async (req,res)=>{
    const userId = req.user._id;
    const cart =await Cart.findOne({userId}).populate('items.bookId');

    if(!cart){
        return res.status(404).send('cart not found')
    }
    res.json(cart)

};

//Remove from cart
exports.removeFromCart=async (req,res)=>{
    const {bookId}=req.body;
    const userId =req.user._id;

    const cart=await Cart.items.filter(item =>item.bookId.toString()!==bookId);
    await cart.save();
        res.send('Book removed from cart')
    
};

//update caet item quantity
exports.updateCart=async (req,res)=>{
    const{bookId,quantity}=req.body;
    const userId=req.user._id;

    const cart=await Cart.findOne({userId});
    if(!cart){
        return res.status(404).send('cart not found')
    }
    const item=await cart.items.find(item=>item.bookId.toString()===bookId);
    if(item){
        item.quantity=quantity;
        await caet.save();
        res.send('Cart updated');
    }else{
        res.status(404).send('Book not found in cart');
    }
};