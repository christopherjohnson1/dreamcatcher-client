import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import "./NewDream.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faRedo, faStopCircle } from '@fortawesome/free-solid-svg-icons'

export const NewDream = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
  
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }

    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }
  
    return (
      <div className="container">
        <div className="d-flex justify-content-center speech-recog">
          <FontAwesomeIcon className="start-recording" onClick={startListening} icon={faMicrophone} />
          <FontAwesomeIcon className="stop-recording" onClick={SpeechRecognition.stopListening} icon={faStopCircle} />
          <FontAwesomeIcon className="reset-recording" onClick={resetTranscript} icon={faRedo} />
        </div>
        <div className="container">
          <div className="d-flex flex-column justify-content-center">
            <h3 className="text-center">Dream Transcript</h3>
          </div>
            <p className="text-center">{transcript}</p>
        </div>
      </div>
    )
  }
