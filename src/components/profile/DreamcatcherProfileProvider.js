import React, { useState } from 'react'

export const DreamcatcherProfileContext = React.createContext()

export const DreamcatcherProfileProvider = (props) => {
    const [ dreamcatcherProfile, setDreamcatcherProfile ] = useState([])

    const token = localStorage.getItem("dreamcatcher_user_id")

    
    const getSingleProfile = (userId) => {
        return fetch(`http://localhost:8000/dreamcatcherusers/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(setDreamcatcherProfile)
    }


    return (
        <DreamcatcherProfileContext.Provider value={{
            dreamcatcherProfile,
            getSingleProfile
        }}>
            {props.children}
        </DreamcatcherProfileContext.Provider>
    )
}