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

    const addNewDream = newDream => {
        return fetch("http://localhost:8000/dreams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(newDream)
        })
    }

    const updateDream = dream => {
        return fetch(`http://localhost:8000/dreams/${dream.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(dream)
        })
    }

    return (
        <DreamsContext.Provider value={{
            dreams,
            getAllDreams,
            addNewDream,
            updateDream
        }}>
            {props.children}
        </DreamsContext.Provider>
    )
}