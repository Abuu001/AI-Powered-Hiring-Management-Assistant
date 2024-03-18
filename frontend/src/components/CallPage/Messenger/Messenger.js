import React, { useState } from 'react'
import "./Messenger.css"
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import PeopleIcon from '@material-ui/icons/People';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {formatDate} from "../../utils/helpers"

function Messenger({setIsMessenger,messageList,sendMsg}) {

    const[message,setMessage]=useState('');

    const handleChange=(e)=>{
         setMessage(e.target.value)
    }

    const handleKeyDown=(e)=>{
        if(e.key === 'Enter' ){
            sendMsg(message)
            setMessage('')
        }
    }

    const handleSendMsg=()=>{
        sendMsg(message)
        setMessage('')
    }

    return (
        <div className="messenger">
            <div className="messenger__header">
                <h1>Meeting Details</h1>
                <ClearIcon className="icon" onClick={()=>setIsMessenger(false)} />
            </div>

            <div className="messenger__header__tabs">
                <div className="tab">
                    <PeopleIcon className="icon"  />
                    <p>People(1)</p>
                </div>
                
                <div className="tab active">
                    <ChatBubbleIcon className="icon" />
                <p>Chat</p>
                </div>
            </div>

            <div className="chat__section">

                {messageList.map((item)=>(
                    <div key={item.time} className="chat__block">
                        <div className="sender">
                            {item.user} <small>{formatDate(item.time)}</small>
                        </div>
    
                        <p className="msg">{item.msg}</p>
                    </div>
                ))}
    
            </div>

            <div className="send__msg__section">
                <input placeholder="Send a message to everyone" value={message} onChange={(e)=>handleChange(e) } onKeyDown={e=>handleKeyDown(e)}/>
                <SendIcon   className="icon" onClick={handleSendMsg}/>
            </div>
        </div>
    )
}

export default Messenger
