const mongoose=require('mongoose')
const {Schema}=mongoose;

const transactionSchema=new Schema({
    
    amount:
    {
        type:String,
        required:[true,"amount is Required"]
    },
    type:
    {
        type:String,
        required:[true,"type is required"]
    },
    category:
    {   type:String,
        required:[true,"category is required and should be unique"],
        unique:true
    },
    date:{
        type:Date,
        required:[true,"Date id required"]
    },
    reference:{
        type:String
    },
    description:
    {type:String,
        required:[true,"description is required"]
    },
    userid:
    {
        type:String,
        required:true
    },
},
{
    timestamps:true
} 
)
module.exports=mongoose.model('transaction',transactionSchema)