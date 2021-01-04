import React, { useState } from "react"

export const MoonPhaseContext = React.createContext()

export const MoonPhaseProvider = (props) => {
    const [moonPhases, setMoonPhases] = useState([])

    const token = localStorage.getItem("dreamcatcher_user_id")

    const getAllMoonPhases = () => {
        return fetch("http://localhost:8000/moonphases", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setMoonPhases)
    }

    return (
        <MoonPhaseContext.Provider value={{getAllMoonPhases, moonPhases}}>
            {props.children}
        </MoonPhaseContext.Provider>
    )

}