const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    auther:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"unread"
    }
})

module.exports = mongoose.model("Books",booksSchema);