import React, { Fragment ,useState} from 'react'
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';

function Registration({setAuth}) {

    const [inputs,setInputs ]= useState({
        name : "",
        email : "",
        password : ""
    })
            
    const {email,name,password} =inputs
    const onChange =(e)=>{
        setInputs({...inputs,[e.target.name]  : e.target.value })
    }

    const onSubmitForm= async (e)=>{
        e.preventDefault()
        try {
            const body =  {email,name,password} 
            const response = await fetch("/auth/register",{
                method :"POST",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify(body)
            })

            const parseResponse = await response.json()
            if(parseResponse.token){
                localStorage.setItem("token",parseResponse.token)
                setAuth(true)
                toast.success("Registered successfully")
            }else{
                toast.error(parseResponse.message)
            }
          //  setInputs(" ")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <div className="container login-container">
                <h1 className="text-centre">Registration</h1>
                <form  onSubmit={onSubmitForm}>
                    <input type="text" name="name"  placeholder="name"  className="form-control my-3" value={name}  onChange={e=>onChange(e)} required/>
                    <input type="email" name="email"  placeholder="email"  className="form-control my-3"  value={email} onChange={e=>onChange(e)} required/>
                    <input type="password" name="password"  placeholder="password"  className="form-control my-3"  value={password}  onChange={e=>onChange(e)} required/>
                    <button className="btn btn-success btn-block">Register</button>
                </form>
                <br></br>
                <br></br>
                <br></br>
                
                <p>Already have an account?   <Link to="/">Login</Link> </p>
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
    </Fragment>
    )
}

export default Registration
