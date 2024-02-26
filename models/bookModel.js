const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author",
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    description:String,
    tags:[String]
})

module.exports=mongoose.model("Book",bookSchema)