const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const colors=require('colors')
const db=require('./db')
const userController=require('./controllers/userController')
//CONFIG DOT ENV FILE
dotenv.config()
//rest objects
const app=express()
//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routs
app.use('/users',require('./routes/userRoute'))
app.use('/transactions',require('./routes/transactionRoute'))
//app.post("/users/register",userController.registerController)
//port
const PORT=3000|| process.env.PORT
//listening
app.listen(PORT,()=>
{
    console.log(`server listening on port ${PORT}`)
})