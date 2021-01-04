import React, { useState } from "react"

export const DreamTypeContext = React.createContext()

export const DreamTypeProvider = (props) => {
    const [dreamTypes, setDreamTypes] = useState([])

    const token = localStorage.getItem("dreamcatcher_user_id")

    const getAllDreamTypes = () => {
        return fetch("http://localhost:8000/dreamtypes", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setDreamTypes)
    }

    return (
        <DreamTypeContext.Provider value={{getAllDreamTypes, dreamTypes}}>
            {props.children}
        </DreamTypeContext.Provider>
    )

}