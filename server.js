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

app.put('/:id',async(req,res)=>{
    try{
        const updateBooks= await Books.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updateBooks){
            return res.status(404).json({message:"updatebook is cannot found"})
        }
        res.json(updateBooks);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.delete('/:id',async(req,res)=>{
    try{
        const deleteBooks= await Books.findByIdAndDelete(req.params.id);
        if(!deleteBooks){
            return res.status(404).json({message:"deletebook is cannot found"});
        }
        res.json(deleteBooks);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})