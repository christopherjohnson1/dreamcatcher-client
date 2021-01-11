import React, { useContext, useEffect, useState } from 'react'
import { faMicrophoneAlt, faRedo, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DreamsContext } from "./DreamsProvider"
import { DreamTypeContext } from "../dreamtype/DreamTypeProvider"
import { ExerciseTypeContext } from "../exercise/ExerciseTypeProvider"
import { MoonPhaseContext } from "../moonphase/MoonPhaseProvider"
import { StressTypeContext } from "../stress/StressTypeProvider"
import "./NewDream.css"

export const NewDream = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    const { getAllDreamTypes, dreamTypes } = useContext( DreamTypeContext )
    const { getAllExerciseTypes, exerciseTypes } = useContext( ExerciseTypeContext )
    const { getAllMoonPhases, moonPhases } = useContext( MoonPhaseContext )
    const { getAllStressTypes, stressTypes } = useContext( StressTypeContext )
    const { addNewDream, dreams, getAllDreams, updateDream } = useContext( DreamsContext )

    const titleDialog = React.createRef()

    // get dreamTypes, exerciseTypes, moonPhases, and stressTypes to populate the dropdown
    useEffect(() => {
        getAllDreams()
        getAllDreamTypes()
        getAllExerciseTypes()
        getAllMoonPhases()
        getAllStressTypes()
    }, [])
    
    useEffect(() => {
        getDreamInEditMode()
    }, [])

    const [dream, setDream] = useState({})
    const [checked, setChecked] = useState(false)
    
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
            setChecked(dreamToEdit.private)
        }
    }

    
    
    const handleControlledInputChange = (e) => {
        const newDream = Object.assign({}, dream)     // create a copy
        newDream[e.target.name] = e.target.value      // modify a copy
      setDream(newDream)
    }
    
    // changes the value of the checkbox
    const checkboxHandler = () => {
        setChecked(!checked)
    }
    
    // saves dream changes if in editMode, or saves a new dream if not in edit mode also checks to see if dream.title exists before creating a new dream
    // if dream.title doesn't exist it will present the user with a modal telling them to add a title.
    const constructNewDream = () => {
        if (editMode) {
            updateDream({
                id: dream.id,
                title: dream.title,
                dream_story: dream.dream_story,
                private: checked,
                dream_type_id: parseInt(dream.dream_type_id),
                exercise_id: parseInt(dream.exercise_id),
                stress_id: parseInt(dream.stress_id),
                moon_phase_id: parseInt(dream.moon_phase_id)
            })
                .then(() => props.history.push("/all-dreams/my-dreams"))
        } else if (dream.title) {
            addNewDream({
                title: dream.title,
                dream_story: transcript.charAt(0).toUpperCase() + transcript.slice(1),
                private: checked,
                dream_type_id: parseInt(dream.dream_type_id),
                exercise_id: parseInt(dream.exercise_id),
                stress_id: parseInt(dream.stress_id),
                moon_phase_id: parseInt(dream.moon_phase_id)
            })
                .then(() => props.history.push("/all-dreams/my-dreams"))
        } else {
            titleDialog.current.showModal()
        }
    }
  
    return (
      <div className="container">

            <dialog className="dialog dialog--password" ref={titleDialog}>
                <div>Please enter a dream title.</div>
                <button className="button--close" onClick={e => titleDialog.current.close()}>Close</button>
            </dialog>

          {/* Begin Speech Recognition Section */}
        <div className="d-flex justify-content-center speech-recog">
          <FontAwesomeIcon className="start-recording" onClick={startListening} icon={faMicrophoneAlt} />
          <FontAwesomeIcon className="stop-recording" onClick={SpeechRecognition.stopListening} icon={faStopCircle} />
          <FontAwesomeIcon className="reset-recording" onClick={resetTranscript} icon={faRedo} />
        </div>
        {/* End Speech Recogntion Section */}
        <form className="DreamForm">
            <h3 className="DreamForm__header text-center">{editMode ? "Edit Your Dream" : "Record A New Dream"}</h3>
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
                    <textarea type="text" name="dream_story" rows="15" required autoFocus className="form-control"
                        placeholder="Click the red microphone to start recording, click the black stop button to end recording, and the circle arrow to reset the transcript."
                        defaultValue={dream.dream_story || transcript.charAt(0).toUpperCase() + transcript.slice(1)}
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

                            <option value="0">Select a dream type...</option>
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="stress_id">Any stressful events? </label>
                    <select name="stress_id" className="form-control"
                        proptype="int"
                        value={dream.stress_id}
                        onChange={handleControlledInputChange}>

                            <option value="0">Select stress event...</option>
                            {stressTypes.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.stress_event}
                                </option>
                            ))}
                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="moon_phase_id">What was the moon phase? </label>
                    <select name="moon_phase_id" className="form-control"
                        proptype="int"
                        value={dream.moon_phase_id}
                        onChange={handleControlledInputChange}>

                            <option value="0">Select moon phase...</option>
                            {moonPhases.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                </div>
            </fieldset>
            <div>
                <label>
                    <input type="checkbox" id="private-checkbox" value={checked} checked={checked} onChange={checkboxHandler}></input>
                    Private?
                </label>
            </div>
            
            <div className="text-center">
                    {editMode ? 
                    <button type="submit"
                    onClick={() => {props.history.push('/all-dreams/my-dreams')}}
                    className="btn btn-form btn-danger btn-sm mb-3 mx-4">
                        Cancel
                </button> : ''}
                <button type="submit"
                    onClick={e => {
                        e.preventDefault()
                        constructNewDream()
                    }}
                    className="btn btn-form btn-success btn-sm mb-3">
                        {editMode ? "Save Updates" : "Save New Dream"}
                </button>
            </div>
        </form>
      </div>
    )
  }
