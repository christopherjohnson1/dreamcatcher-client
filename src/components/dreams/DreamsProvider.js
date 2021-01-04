import React, { useState } from 'react'

export const DreamsContext = React.createContext()

export const DreamsProvider = (props) => {
    const [ dreams, setDreams ] = useState([])

    const token = localStorage.getItem("dreamcatcher_user_id")

    const getAllDreams = () => {
        return fetch("http://localhost:8000/dreams", {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(setDreams)
    }

    return (
        <DreamsContext.Provider value={{
            dreams,
            getAllDreams
        }}>
            {props.children}
        </DreamsContext.Provider>
    )
}