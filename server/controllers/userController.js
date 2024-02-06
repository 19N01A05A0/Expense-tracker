const userModel=require('../models/userModel')

module.exports.loginController=async(req,res)=>
{
    try{
        const {email,password}=req.body
        console.log(req.body)
        const user=await userModel.findOne({email,password})
        console.log(user)
        if(!user)
        {
            return res.status(404).send("User not found")
        }
        return res.status(200).json({user,success:true})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error})
    }
}

module.exports.registerController=async(req,res)=>
{   console.log(21,req.body)
    try{
        const newuser=new userModel(req.body)
        console.log(24,newuser)
        await newuser.save()
       
        return res.status(200).json({newuser,success:true})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error})
    }
}