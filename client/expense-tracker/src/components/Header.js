import { message } from "antd"
import React, { useEffect ,useState} from "react"
import {Link, useNavigate} from "react-router-dom"
const Header=()=>
{   const navigate=useNavigate()
    const [loginUser,setLoginUser]=useState('')
    const logoutHandler=()=>
    {
      localStorage.removeItem('user')
      message.success("logout successful")
      navigate('/login')
    }
    useEffect(()=>
    {
      const user=JSON.parse(localStorage.getItem('user'))
      if(user)
      {
        setLoginUser(user)
      }
    },[])
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Expense Management</Link>
    
    <div class="d-flex">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="#">{loginUser && loginUser.name}</Link>
        </li>
        <li class="nav-item">
          <button className="btn" style={{border:" 2px solid white",color:"black"}} onClick={logoutHandler}>Logout</button>
          
        </li>
        </ul>
    </div>
  </div>
</nav>
        </>
    )
}
export default Header