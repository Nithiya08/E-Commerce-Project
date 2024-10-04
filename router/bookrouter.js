const express=require('express')
const { saveBook, getAllBooks, searchBooks, deleteBook, updateBook, addcart, buyBook } = require('../controller/bookcontroller')
const authMiddleware=require('../middleware/authMiddleware')
const bookRouter=express.Router()


bookRouter.post('/', saveBook);

bookRouter.get('/',getAllBooks)
bookRouter.get('/search/:sunstr',searchBooks)
bookRouter.delete('/:id',deleteBook)
bookRouter.put('/update',authMiddleware,updateBook)
bookRouter.get('/addcart/:id',addcart)
bookRouter.get('/buy/:id', buyBook);

module.exports=bookRouter