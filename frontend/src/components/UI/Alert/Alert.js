import React from 'react'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import "./Alert.css"

function Alert({messageAlert}) {
    return (
        <div className="messageAlert__popup">
            <div className="alert__header"> 
                <ChatBubbleOutlineIcon  className="icon"/>
                <h3>{messageAlert.payload.user}</h3>
            </div>
            <p className="alert__msg">{messageAlert.payload.msg}</p>
        </div>
    )
}

export default Alert
