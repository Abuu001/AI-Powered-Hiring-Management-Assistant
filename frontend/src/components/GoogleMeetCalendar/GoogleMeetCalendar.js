
import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"


function Calendar() {
    return (
    <div className="footer__Icons"> 
       <p></p>
       <div className="message__info">
            <p>  <WarningIcon  color="error" /> {"  "}  View my scheduled interviews</p>
            </div>
            <br></br>
            <br></br>
            <br></br>
      

        <Button   variant="outlined"   color="primary" >
        <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noopener noreferrer">
         View Scheduled interviews and Events.
        </a>
        </Button>

        <Button   variant="outlined"   color="primary" >
        <Link  to="/dashboard/scheduleMeeting" >Schedule Interview With AI assistance</Link> 
        </Button>
    </div>
    )
}

export default Calendar;