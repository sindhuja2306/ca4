const express = require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Books=require("./schema");

dotenv.config();
const app =express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.error(err));

app.post('/',async(req,res)=>{
    try{
        const book=new Books(req.body);
        await book.save();
        res.status(200).json({message:"ok ! it is working"});
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

app.get('/',async(req,res)=>{
    try{
        const books = await Books.find(req.body);
        res.json(books);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.get('/:id',async(req,res)=>{
    try{
        const book = await Books.findById(req.params.id);
        if (!book){
            return res.status(404).json({message:"book is cannot found"})
        }
        res.json(book);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})


app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})
