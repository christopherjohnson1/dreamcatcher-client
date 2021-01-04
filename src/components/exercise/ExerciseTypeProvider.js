import React, { useState } from "react"

export const ExerciseTypeContext = React.createContext()

export const ExerciseTypeProvider = (props) => {
    const [exerciseTypes, setExerciseTypes] = useState([])

    const token = localStorage.getItem("dreamcatcher_user_id")

    const getAllExerciseTypes = () => {
        return fetch("http://localhost:8000/exercises", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setExerciseTypes)
    }

    return (
        <ExerciseTypeContext.Provider value={{getAllExerciseTypes, exerciseTypes}}>
            {props.children}
        </ExerciseTypeContext.Provider>
    )

}