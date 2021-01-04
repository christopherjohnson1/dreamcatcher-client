import React, { useContext, useEffect, useState } from 'react'
import { faMicrophoneAlt, faRedo, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DreamTypeContext } from "../dreamtype/DreamTypeProvider"
import { ExerciseTypeContext } from "../exercise/ExerciseTypeProvider"
import "./NewDream.css"

export const NewDream = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    const { getAllDreamTypes, dreamTypes } = useContext( DreamTypeContext )
    const { getAllExerciseTypes, exerciseTypes } = useContext( ExerciseTypeContext )

    // get dreamTypes, and exerciseTypes to populate the dropdown
    useEffect(() => {
      getAllDreamTypes()
      getAllExerciseTypes()
    }, [])

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }

    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }
  
    return (
      <div className="container">
        <div className="d-flex justify-content-center speech-recog">
          <FontAwesomeIcon className="start-recording" onClick={startListening} icon={faMicrophoneAlt} />
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
