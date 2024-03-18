import React from 'react'
import "./FacialDetector.css"
  
function FacialDetector() {
    return (
        <>
     <img alt="" className="bg ma ou c" width="500" height="500" loading="lazy" role="presentation" src="https://louiejancevski.github.io/FacialEmotionDetector/"/>
     <iframe
        src="https://louiejancevski.github.io/FacialEmotionDetector/"
        title="AI Face Recognition"
        width="80%"
        height="780px" 
		allow="camera; microphone"
       // allowFullScreen
      />
    </>
    )
}

export default FacialDetector
