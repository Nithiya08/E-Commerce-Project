


const Book=require("../models/book")


const { jsPDF } = require('jspdf');
const saveBook=async(req,res)=>{
    try{
       let book =new Book(req.body)
       const saveBook=await book.save()
       res.status(200).json(saveBook)
    }catch(err){
       console.log(err)
    }
   }
   
const getAllBooks=async(req,res)=>{
    try{
  let books=await Book.find()
  res.json(books)
    }catch(err){
        console.log(err)
    }
}
const searchBooks = async (req, res) => {
    const searchStr = req.params.substr; 
    const reqEx = new RegExp(searchStr, 'i');
    let books = await Book.find({ title: reqEx });
    res.json(books);
};
const deleteBook=async(req,res)=>{
    let id=req.params.id
    try{
   let book=await Book.findByIdAndDelete(id)
   console.log(book)
   if(!book)
    res.send(`Book ${id} does not exist`)
else
res.send('Delete sucessfully')
    }catch(err){
        console.log(err)
    }
}
const updateBook = async (req, res) => {
    let book = req.body;
    try {
        let updated = await Book.findByIdAndUpdate(book._id, book, { new: true });
        res.status(200).json(updated); 
    } catch (error) {
       
        res.status(500).json({ error: 'Failed to update book' });
    }
};


const addcart=async (req,res)=>{
    let id=req.params.id
    try{
        let book=await Book.findById(id) 
        if(!book)
            res.send(`Book with ${id} does not exsit`)
        else
            res.json(book)
        
    }catch(error){
        console.log(error)
    }
}
const buyBook = async (req, res) => {
    try {
        const { id } = req.params; 
        const book = await Book.findById(id); 
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        
        const doc = new jsPDF();

        
        doc.text('Invoice for Book Purchase', 10, 10);
        doc.text(`Title: ${book.title}`, 10, 20);
        doc.text(`Author: ${book.author}`, 10, 30);
        doc.text(`Price: ${book.price}`, 10, 40);
        doc.text(`Description: ${book.description}`, 10, 50);
        doc.text('Thank you for your purchase!', 10, 70);

        
        const pdfBuffer = doc.output('arraybuffer');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        res.send(Buffer.from(pdfBuffer));
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while processing the purchase" });
    }
};

module.exports={saveBook,getAllBooks,searchBooks,deleteBook,updateBook,addcart,buyBook}