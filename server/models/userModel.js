const mongoose=require('mongoose')
const {Schema}=mongoose;

const userSchema=new Schema({
    name:
    {
        type:String,
        required:[true,"name is Required"]
    },
    email:
    {   type:String,
        required:[true,"email is required and should be unique"],
        unique:true
    },
    password:
    {type:String,
        required:[true,"password is required"]
    },
},
{
    timestamps:true
} 
)
module.exports=mongoose.model('user',userSchema)