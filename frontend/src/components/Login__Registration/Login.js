import React, { Fragment,useState } from 'react'
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import Footer from '../Footer/Footer';
import "./Login.css"

function Login({setAuth}) {

    const [inputs,setInputs]=useState({
        email : "",
        password : ""
    })

    const {email,password,name} = inputs;
    const onChange =(e)=>{
        setInputs({...inputs,[e.target.name]  : e.target.value })
    }   

    const onSubmitForm= async(e)=>{
        e.preventDefault()
        try {
            const body = {email,password,name}
            const response = await fetch("/auth/login",{
                method :"POST",
                headers : {"Content-Type" : "application/json"},
                body  : JSON.stringify(body)
            })

            const parseRes = await response.json()
            if(parseRes.token){
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                parseRes.message === "Password or Email is incorrect" ?  setAuth(false) : setAuth(true)
                toast.success("Login successfully !!")
            }else{
                toast.error(parseRes.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            }
   
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
    <Fragment>
        <div className="container login-container">
            <h1>AI POWERED HIRING MANAGEMENT SYSTEM <i>(AIHMS)</i> </h1>
            <br></br>
            <br></br>
            <h3>Login</h3>
            <form onSubmit={onSubmitForm} >
                <input type="email" name="email"  placeholder="email"  className="form-control my-3"  value={email} onChange={e=>onChange(e)} required/>
                <input type="password" name="password"  placeholder="password"  className="form-control my-3"  value={password}  onChange={e=>onChange(e)} required/>
                <button className="btn btn-success btn-block">Login</button>
            </form>
            <br></br>
            <br></br>
            <br></br>
          <p>Not Registered ?   <Link to="/register">Register an account</Link> </p>
            <div  className="socialmedia__Icons">
               <a href="/register" className=" socialMedia__Icon1 ">
                    <i className="fab fa-google "> </i> 
                </a>
                <a href="/register" className=" socialMedia__Icon2">
                <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="/register" className=" socialMedia__Icon3">
                    <i className="fab fa-facebook" aria-hidden="true"></i>
                </a> 
                <a href="/register" className=" socialMedia__Icon4">
                <i className="fab fa-instagram" aria-hidden="true"></i>
                </a> 
                <a href="/register" className=" socialMedia__Icon5">
                <i className="fab fa-whatsapp" aria-hidden="true"></i>
                </a> 
            </div>
        </div>
        
        <div className="login__footer">
         <Footer />
        </div>
    </Fragment>
    )
}

export default Login
