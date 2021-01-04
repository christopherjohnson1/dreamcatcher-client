import React, { useState } from "react"

export const StressTypeContext = React.createContext()

export const StressTypeProvider = (props) => {
    const [stressTypes, setStressTypes] = useState([])

    const token = localStorage.getItem("dreamcatcher_user_id")

    const getAllStressTypes = () => {
        return fetch("http://localhost:8000/stressevents", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setStressTypes)
    }

    return (
        <StressTypeContext.Provider value={{getAllStressTypes, stressTypes}}>
            {props.children}
        </StressTypeContext.Provider>
    )

}