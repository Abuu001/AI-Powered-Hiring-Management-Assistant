import React, { useEffect, useState } from 'react'
import "./CallPageHeader.css";
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {formatDate} from "../../utils/helpers"


function CallPageHeader( {isMessenger , setIsMessenger,setMessageAlert,messageAlert}) {

    let interval = null;
    const [currentTime,setCurrentTime]=useState(()=>{
        return  formatDate()
    })

    useEffect(()=>{
        interval = setInterval(()=>setCurrentTime(formatDate()),1000 * 60);
        return()=>{
            clearInterval(interval)
        }
    })
    return (
        <div className="CallPageHeader">
            <div className="header__items icon__block">
                <GroupIcon className="icon" />
            </div>
            <div className="header__items icon__block" onClick={()=>{
                setIsMessenger(true)
                setMessageAlert({})
            }}>
                <ChatIcon   className="icon"  />
                {isMessenger && messageAlert.alert && (
                    <span className="alert__alert__icon"></span>
                )}
            </div>

            <div className="header__items date__block">
                {currentTime}
            </div>

            <div className="header__items icon__block">
                <AccountCircleIcon    className="icon profile" />
            </div> 
        </div>
    )
}  

export default CallPageHeader
