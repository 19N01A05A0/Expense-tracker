import React,{useState,useEffect} from "react"
import {Button,Form,Input,message} from "antd"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import Spinner from "../components/Spinner"
const LoginPage=()=>
{   const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    const submitHandler=async(values)=>
    {
        //console.log(values)
        try{
            setLoading(true)
            const {data}=await axios.post('http://localhost:3000/users/login',values);
            message.success("Login successfull");
            setLoading(false)
            localStorage.setItem("user",JSON.stringify({...data.user,password:''}))
            navigate('/')
        }
        catch(error)
        {   setLoading(false)
            message.error("Something went wrong")
        }
    }
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
                <h1>Login Form</h1>
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                 <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>
                    
                    <Link style={{color:'black',textDecoration:'None'}} to="/register">New User ?<span style={{color:'rgb(67, 64, 64)'}}>Click here to Register</span></Link>
                    <br></br>
                    <button className="btn mt-2" style={{backgroundColor:'rgb(92, 91, 91)',color:'white',display:'block',width:"100%"}}>Login</button>
                

            </Form>
            </div>
        </div>
      
        </>
    )
}
export default LoginPage