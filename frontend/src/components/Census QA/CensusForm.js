import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import "./CensusForm.css"

function CensusForm() {

    const [Q1,setQ1]= useState(0)
    const [Q2,setQ2]= useState("")
    const [Q3,setQ3]= useState(0)
    const [Q4,setQ4]= useState(0)
    const [Q5,setQ5]= useState('')
    const [Q6,setQ6]= useState('')
    const [Q7,setQ7]= useState('')
    const [Q8,setQ8]= useState(0)

    const handleSubmit=()=>{
        postData()
    }

    const postData=async()=>{
        const body =  { Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8}
        const response = await fetch("/count/dashboard/censusForm",{
            method :"POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(body)
        })
    }

    useEffect(()=>{
        postData()
    },[])
    return (
        <div>
             <form className="census__Form">
            
                    <p style={{ fontSize: '45px', justifyContent: 'center', display: 'flex', alignItems: 'center' }} className="centeredText">
                    Your interview has Successfully been scheduled...
                    </p>
                 
                 <div className='button_org'>
                    <Button   variant="outlined"   color="primary" onClick={handleSubmit}>
                    <Link  to="/dashboard/calendarGoogleMeet" >View My Calendar</Link> 
                    </Button>

                    <Button   variant="outlined"   color="primary" onClick={handleSubmit}>
                    <Link  to="/dashboard/meeting" >Join Session</Link> 
                    </Button>
    
                    <Button   variant="outlined"   color="primary" onClick={handleSubmit}>
                    <Link  to="/dashboard/censusQA" >Back</Link> 
                    </Button>
                    
                 </div>

            </form>
        </div>
    )
}

export default CensusForm
