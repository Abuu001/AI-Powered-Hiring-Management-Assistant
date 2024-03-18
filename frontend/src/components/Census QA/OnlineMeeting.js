import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import "./OnlineMeeting.css"
import FacialDetector from './FacialDetector';
import CallPage from "../CallPage/CallPage"

function OnlineMeeting() {

    const [name,setName]=useState("") 

    const getName =async ()=>{
        try {
            const response = await fetch("/dashboard",{
                method :"GET",
                headers : {token : localStorage.token },
            })
            const parseRes =  await response.json()
            setName(parseRes.user_name)
            console.log(parseRes);
        } catch (error) {
            console.log(error.message);
        }
    }

    const logout=(e)=>{
        e.preventDefault()
        localStorage.removeItem("token")
        // setAuth(false)
        toast.dark("Logged out Successfully")
    }

    useEffect(()=>{
        getName()
    },[])
    return (
        <div>
            <div className='online_meeting'>
                        <Button   variant="outlined"   color="primary" >
                            <Link  to="/dashboard/censusForm" >Back</Link> 
                        </Button>

                        <button   className="btn btn-primary btn-block" onClick={e=>logout(e)}><Link  to="/final" style={{color : "white",textDecoration:"none",fontWeight:900}}>Log Out</Link> </button>
                       
            </div>

           
                <div className='googleMeet_container'>
                    <CallPage />
                </div>

                <div className='online_meeting_frames'>
                    {/* <div className="ai_gif">
                        <img alt="" className="bg ma ou c embddd" width="50" height="50" loading="lazy" role="presentation" src="https://miro.medium.com/v2/resize:fit:1000/1*YF4KdQE-RadFtNa6n66wdg.gif"/>  
                    </div> */}
                    {/* <div className='facialdetector_container'>
                        <FacialDetector /> 
                    </div> */}
                    {/* <div className='meet_container_and_frames'>
                    </div> */}
            </div>
          
        </div>
    )
}

export default OnlineMeeting
