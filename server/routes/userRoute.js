const express= require('express')
const userController=require('../controllers/userController')
//router obj
const router=express.Router()
//routers
router.post('/login',userController.loginController)
router.post('/register',userController.registerController)
module.exports=router