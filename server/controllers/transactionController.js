const transactionModel =require('../models/transactionModel')
const moment=require('moment')
module.exports.addTransaction=async(req,res)=>
{   console.log(3,req.body)
    try{
        const newtransaction=new transactionModel(req.body)
        console.log(24,newtransaction)
        await newtransaction.save()
        console.log(8,newtransaction)
        return res.status(200).json({newtransaction,success:true})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error})
    }
}
module.exports.getAllTransactions=async(req,res)=>
{       console.log(18,req.body)
    try{
        const {frequency}=req.body
        console.log(21,req.body)
        if (req.body.option == '7') {
            // Use Moment.js to calculate last week's dates
            startDate = moment().subtract(7, 'days').startOf('week');
            endDate = moment().endOf('week');
            console.log(startDate,endDate)
          } else if (req.body.option == '30') {
            // Calculate last month's dates
             startDate = moment().subtract(1, 'month').startOf('month');
             endDate = moment().subtract(1, 'month').endOf('month');
            console.log(startDate,endDate)
            console.log(32,startDate.toDate())
            console.log(startDate.toString())
            const datePart = startDate.toString().slice(7,28);  // Extract characters from index 7 to 27
console.log(datePart);
            console.log("saadsads")
          }
        //console.log(34,moment().subtract(Number(option),'d').toDate())
        /*const transactions=await transactionModel.find({
            date:{
                $gt:moment().subtract(Number(option),'d').toDate()
            },
            date: { $gte: startDate, $lt: endDate },
            userid:req.body.userid})*/
            const records= await transactionModel.find({date:"2023-12-11T00:00:00.000+00:00"})
            console.log(42,records)
            console.log("strt",startDate.toDate(),"end",endDate.toDate())
            const transactions=await transactionModel.find({ date: { $gte: startDate.toDate(), $lt: endDate.toDate()} })
    
    
        console.log(24,transactions)
        
        
       
        return res.status(200).json({transactions,success:true})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error})
    }
}
module.exports.getTransactions=async(req,res)=>
{       console.log(39,req.body.userid)
    try{
        const {frequency}=req.body
        console.log(42,req.body)
        const transactions=await transactionModel.find({
            
            userid:req.body.userid})
        console.log(46,transactions)
        
       
        return res.status(200).json({transactions,success:true})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error})
    }
}
module.exports.editTransaction=async(req,res)=>
{
    try
    {
        const rec=await transactionModel.findOneAndUpdate(
            {_id:req.body.transactionId},
            req.body.payload
        )
        console.log(88,rec)
        return res.status(200).json({success:true})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error})
    }
}
module.exports.deleteTransaction=async(req,res)=>
{
    try
    {
        const rec=await transactionModel.findOneAndDelete(
            {_id:req.body.transactionId},
        )
        console.log(103,rec)
        return res.status(200).json({success:true})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error})
    }
}