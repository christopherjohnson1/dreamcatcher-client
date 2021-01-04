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
    const { addNewDream, dreams, getAllDreams, updateDream } = useContext( DreamsContext )

    // get dreamTypes, and exerciseTypes to populate the dropdown
    useEffect(() => {
        getAllDreams()
        getAllDreamTypes()
        getAllExerciseTypes()
    }, [])
    
    useEffect(() => {
        getDreamInEditMode()
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

    const editMode = props.match.params.hasOwnProperty("dreamId") // true or false

    // if in edit mode, get the dream that matched the postId
    const getDreamInEditMode = () => {
        if (editMode) {
            const dreamId = parseInt(props.match.params.dreamId)
            const dreamToEdit = dreams.find(d => d.id === dreamId) || {}
            setDream(dreamToEdit)
        }
    }


    const handleControlledInputChange = (e) => {
      const newDream = Object.assign({}, dream)     // create a copy
      newDream[e.target.name] = e.target.value      // modify a copy
      setDream(newDream)
    }

    const constructNewDream = () => {
        if (editMode) {
            updateDream({
                id: dream.id,
                title: dream.title,
                dream_story: dream.dream_story,
                private: false,
                dream_type_id: parseInt(dream.dream_type_id),
                exercise_id: parseInt(dream.exercise_id),
                stress_id: parseInt(2),
                moon_phase_id: parseInt(2)
            })
                .then(() => props.history.push("/all-dreams"))
        } else {
            addNewDream({
                title: dream.title,
                dream_story: transcript,
                private: false,
                dream_type_id: parseInt(dream.dream_type_id),
                exercise_id: parseInt(dream.exercise_id),
                stress_id: parseInt(2),
                moon_phase_id: parseInt(2)
            })
                .then(() => props.history.push("/all-dreams"))
        }
    }
  
    return (
      <div className="container">
        <div className="d-flex justify-content-center speech-recog">
          <FontAwesomeIcon className="start-recording" onClick={startListening} icon={faMicrophoneAlt} />
          <FontAwesomeIcon className="stop-recording" onClick={SpeechRecognition.stopListening} icon={faStopCircle} />
          <FontAwesomeIcon className="reset-recording" onClick={resetTranscript} icon={faRedo} />
        </div>
        <form className="DreamForm">
            <h3 className="DreamForm__header text-center">{editMode ? "Edit Your Dream" : "Save A New Dream"}</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title :</label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        placeholder="Dream Title"
                        defaultValue={dream.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dream_story">Dream Story :</label>
                    <textarea type="text" name="content" rows="15" required autoFocus className="form-control"
                        placeholder="Click the red microphone to start recording, click the black stop button to end recording, and the circle arrow to reset the transcript."
                        defaultValue={transcript}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dream_type_id">Dream Type: </label>
                    <select name="dream_type_id" className="form-control"
                        proptype="int"
                        value={dream.dream_type_id}
                        onChange={handleControlledInputChange}>

                            <option value="0">Select a dream type</option>
                            {dreamTypes.map(d => (
                                <option key={d.id} value={d.id}>
                                    {d.label}
                                </option>
                            ))}
                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="exercise_id">Any Exercise Yesterday? </label>
                    <select name="exercise_id" className="form-control"
                        proptype="int"
                        value={dream.exercise_id}
                        onChange={handleControlledInputChange}>

                            <option value="0">Select exercise type...</option>
                            {exerciseTypes.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.exercise_type}
                                </option>
                            ))}
                        </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    constructNewDream()
                }}
                className="btn btn-form btn-warning btn-sm mt-3">
                    {editMode ? "Save Updates" : "Save New Dream"}
                </button>
        </form>
      </div>
    )
  }
