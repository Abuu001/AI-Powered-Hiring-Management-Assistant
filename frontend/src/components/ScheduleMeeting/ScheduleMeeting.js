
import React from 'react';
 import Button from '@material-ui/core/Button';
 import Siriwave from 'react-siriwave';
 import "./ScheduleMeeting.css"
 import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
 import { toast } from 'react-toastify';
 import Microphone from "../Assets/Microphone.png"

 

function ScheduleMeeting() {
    // const [value, onChange] = useState<Value>(new Date());

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();


      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

      const onClickStop= async(e)=>{
        e.preventDefault()
        toast.success("Interview Meeting has been Scheduled Successfully!!!")
        console.log("Stop clicked");
       }

    return (
    <div className="siri_wave">
        <Siriwave style="ios" color="#6adc92" ratio={4} />
        <Siriwave style="ios9" color="#a390ff" ratio={2} frequency={111} cover={true}/>  

       <i>Please click on <b>Start</b> to Enable Speech Recognition Scheduling With AI.</i>
       <div  className="microphone">
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <img  src={Microphone} alt="Microphone icon"/>
        </div>
      
      <div className="speech_buttons">
        <Button   variant="outlined"   color="primary"  onClick={SpeechRecognition.startListening} > Start  </Button>
        <Button   variant="outlined"   color="primary"  onClick={SpeechRecognition.stopListening} > Stop  </Button>
        <Button   variant="outlined"   color="primary"  onClick={resetTranscript} > Reset  </Button>
        <Button   variant="outlined"   color="primary"  onClick={onClickStop} > Done  </Button>
        <Button   variant="outlined"   color="primary" >
            <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noopener noreferrer">
            View Scheduled Meeting  </a>  
        </Button>
       </div>
      <hr/>
      <p>{transcript}</p>       
 
    </div>
    )
}

export default ScheduleMeeting;