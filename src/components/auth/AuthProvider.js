import React, { useState, useEffect } from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({events:[]})

    const token = localStorage.getItem("dreamcatcher_user_id")

    const getProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }

    

    useEffect(getProfile, [])

    return (
        <ProfileContext.Provider value={{
            profile, getProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}
