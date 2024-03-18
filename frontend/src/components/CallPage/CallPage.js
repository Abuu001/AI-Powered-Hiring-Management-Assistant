import React, { useEffect, useReducer, useState } from "react";
import "./CallPage.css";
import CallPageFooter from "./CallPageFooter/CallPageFooter";
import CallPageHeader from "./CallPageHeader/CallPageHeader";
import MeetingInfo from "./MeetingInfo/MeetingInfo";
import Messenger from "./Messenger/Messenger";
import { useHistory, useParams } from "react-router-dom";
import MessageListReducer from "../../components/Reducer/MessageListReducer";
import Peer from "simple-peer";
import { postRequest, getRequest } from "../utils/apiRequests";
import { GET_CALL_ID, SAVE_CALL_ID } from "../utils/apiEndPoints";
import Alert from "../UI/Alert/Alert";
import io from "socket.io-client";
import FacialDetector from "../Census QA/FacialDetector";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const socket = io.connect("http://localhost:3002");

let peer = null;
const initialState = [];

function CallPage() {
  const history = useHistory();
  let { id } = useParams();
  const [screenCastStream, setScreenCastStream] = useState();
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [isAudio, setIsAudio] = useState(true);
  const [streamObj, setStreamObj] = useState();
  const [messageAlert, setMessageAlert] = useState({});
  const [meetingInfoPopup, setMeetingInfoPopup] = useState(false);
  const [showVideo,setShowVideo]=useState(true)
  let alertTimeout = null;
  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  //check if user is admin
  const isAdmin = window.location.hash === "#init" ? true : false;
  const url = `${window.location.origin}${window.location.pathname}/shared`;



  useEffect(() => {
    SpeechRecognition.startListening();
    if (isAdmin) {
      setMeetingInfoPopup(true);
    }

    initWebRTC();

    socket.on("code", (data) => {
      peer.signal(data);
    });
  }, [showVideo]);
 
  const getReceiverCode = async () => {
    // const res = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    const res = await getRequest(`${GET_CALL_ID}/${id}`);
    console.log(res)
    if (res.code) {
      peer.signal(res.code);
    }
  };

  const initWebRTC = () => {
    let video = document.querySelector("#videoElement");
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: showVideo, audio: true })
        .then(function (stream) {
          video.srcObject = stream;

          setStreamObj(stream);

          peer = new Peer({
            initiator: isAdmin,
            trickle: false,
            stream: stream,
          });

          if (!isAdmin) {
            getReceiverCode();
          }

          peer.on("signal", async (data) => {
            if (isAdmin) {
              let payload = {
                id,
                signalData: data,
              };
              await postRequest(`${SAVE_CALL_ID}`, payload);
            } else {
              socket.emit("code", data, (cbData) => {
                console.log("code sent");
              });
            }
          });

          peer.on("connect", () => {
            // wait for 'connect' event before using the data channel
            console.log("Conected")
          });
 
          peer.on("data", (data) => {
            clearTimeout(alertTimeout);
            messageListReducer({
              type: "addMessage",
              payload: {
                user: "other",
                msg: data.toString(),
                time: Date.now(),
              },
            });

            setMessageAlert({
              alert: true,
              isPopup: true,
              payload: {
                user: "other",
                msg: data.toString(),
              },
            });

            alertTimeout = setTimeout(() => {
              setMessageAlert({
                ...messageAlert,
                isPopup: false,
                payload: {},
              });
            }, 10000);
          });

          peer.on("stream", (stream) => {
         ///   got remote video stream, now let's show it in a video tag
            let video = document.querySelector("#videoElement");
            if ("srcObject" in video) {
              video.srcObject = stream;
            } else {
              video.src = window.URL.createObjectURL(stream); // for older browsers
            }
            video.play();
          });
        })
        .catch(function (error) {
          console.log("Something went wrong!",error.message);
        });
    }
  };

  const sendMsg = (msg) => {
 
    peer.send(msg);  
    // peer.on('connect', (msg) => {
    //   console.log('I am connected now')
    // }) 

    messageListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });

  };

  const screenShare = async() => {

    var displayMediaOptions = {
      video: {
        cursor: "always"
      },
      audio: true
    };

    let video = document.querySelector("#videoElement");
    video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks(),
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
          );
        };
    
        setIsPresenting(true);
      });
  };


  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach((track) => {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );

    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const disableVideo=async()=>{
    setShowVideo(prev=>!showVideo);
   console.log("disabled video call")
  }

  const disconnectCall = () => {
    peer.destroy();
    history.push("/");
    window.location.reload();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="CallPage" >
      {/* <video
        className="Video__Container"
        src=""
        type="video/mp4"
        autoPlay={true}
        id="videoElement"
        controls
      ></video> */}
      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
       <div className='online_meeting_frames'>
           <div className='facialdetector_container' onClick={SpeechRecognition.startListening}>
                  <FacialDetector /> 
           </div>
           <div className="gpp">
            <div className="ai_gif">
                  <img alt="" onClick={resetTranscript} className="bg ma ou c embddd" width="300" height="300" loading="lazy" role="presentation" src="https://miro.medium.com/v2/resize:fit:1000/1*YF4KdQE-RadFtNa6n66wdg.gif"/>  
              </div> 
              <div className="meeting_link_box">
                <MeetingInfo setMeetingInfoPopup={setMeetingInfoPopup} url={url} onClick={SpeechRecognition.startListening}/>
              </div>
           </div>
       </div>

       <p className="transcript_txt">{transcript}</p>   

      <CallPageFooter
       disableVideo={disableVideo}
       showVideo={showVideo}
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
        isAudio={isAudio}
      />
      {isAdmin && meetingInfoPopup && (
        <MeetingInfo setMeetingInfoPopup={setMeetingInfoPopup} url={url} />
      )}
      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}

      
    </div>
  );
}

export default CallPage;
