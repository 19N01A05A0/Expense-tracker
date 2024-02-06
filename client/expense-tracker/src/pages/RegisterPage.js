import React,{useEffect, useState} from "react"
import {Button,Form,Input,message} from "antd"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import Spinner from "../components/Spinner"
const RegisterPage=()=>
{   const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const submitHandler=async(values)=>
    {
        //console.log(values)
        try{
            setLoading(true)
            await axios.post('http://localhost:3000/users/register',values);
            message.success("Registration successfull");
            setLoading(false)
            navigate('/login')
        }
        catch(error)
        {   setLoading(false)
            message.error("something went wrong")
        }
    }
    //prevent  user login
    useEffect(()=>
    {
        if(localStorage.getItem("user"))
        {
            navigate("/")
        
    }},[navigate])
    return(
        <>
         <div className="register-page" >
            {loading&&<Spinner/>}
            <div className="card p-5" style={{boxShadow:"2px 2px 4px gray"}}>
            <Form layout="vertical" onFinish={submitHandler} >
                <h1>Register Form</h1>
                <Form.Item label="Name" name="name">
                    <Input type="text"/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                 <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>
                    
                    <Link style={{color:'black',textDecoration:'None'}} to="/login">Already a User ?<span style={{color:'rgb(67, 64, 64)'}}>Click here to Login</span></Link>
                    <br></br>
                    <button className="btn mt-2" style={{backgroundColor:'rgb(92, 91, 91)',color:'black',display:'block',width:"100%"}}>Register</button>
                

            </Form>
            </div>
        </div>
        
        </>
    )
}
export default RegisterPage