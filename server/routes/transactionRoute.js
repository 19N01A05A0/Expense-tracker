const express= require('express')
const transactionController=require('../controllers/transactionController')
//router obj
const router=express.Router()
//routersaddTransaction
router.post('/add-transaction',transactionController.addTransaction)
router.post('/get-all-transactions',transactionController.getAllTransactions)
router.post('/get-transactions',transactionController.getTransactions)
router.post('/edit-transaction',transactionController.editTransaction)
router.post('/delete-transaction',transactionController.deleteTransaction)
module.exports=router