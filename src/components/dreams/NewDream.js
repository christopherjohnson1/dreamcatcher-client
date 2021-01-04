import React, { useContext, useEffect, useState } from 'react'
import { faMicrophoneAlt, faRedo, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DreamsContext } from "./DreamsProvider"
import { DreamTypeContext } from "../dreamtype/DreamTypeProvider"
import { ExerciseTypeContext } from "../exercise/ExerciseTypeProvider"
import "./NewDream.css"

export const NewDream = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    const { getAllDreamTypes, dreamTypes } = useContext( DreamTypeContext )
    const { getAllExerciseTypes, exerciseTypes } = useContext( ExerciseTypeContext )
    const { addNewDream } = useContext( DreamsContext )

    // get dreamTypes, and exerciseTypes to populate the dropdown
    useEffect(() => {
      getAllDreamTypes()
      getAllExerciseTypes()
    }, [])

    const [dream, setDream] = useState({})

    // if browser doesn't support speech recognition return null
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }

    // function to be passed to the start-recording onClick to enable continuous recording.
    const startListening = () => {
        return SpeechRecognition.startListening({ continuous: true })
    }


    const handleControlledInputChange = (e) => {
      const newDream = Object.assign({}, dream)     // create a copy
      newDream[e.target.name] = e.target.value      // modify a copy
      setDream(newDream)
    }

    const constructNewDream = () => {
        addNewDream({
            
        })
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
