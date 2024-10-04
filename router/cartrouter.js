const express=require('express');
const router=express.Router();
const cartController=require('../controller/cartcontroller');
const authMiddleware=require('../middleware/authMiddleware');



//assuming you have middleware to authetivate and populate request.user
//router.use(authmiddleware);

router.post('/add',authMiddleware,cartController.addToCart);
router.get('/',authMiddleware,cartController.viewCart);
router.post('/remove',authMiddleware,cartController.removeFromCart);
router.post('/update',authMiddleware,cartController.updateCart);
router.delete('/:bookId',(req,res)=>{
    const { bookId } = req.params;
    res.status(200).send({ message: 'Book removed from cart' });
});

module.exports=router;

