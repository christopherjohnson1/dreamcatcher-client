import React, { useContext, useEffect, useState } from 'react'
import { DreamsContext } from './DreamsProvider'
import { ProfileContext } from '../auth/AuthProvider'
import './AllDreams.css'

export const AllDreams = props => {
    const { getAllDreams, dreams, getDreamsByUser, myDreams } = useContext(DreamsContext)
    const { profile } = useContext(ProfileContext)

    const [ showOthersDreams, setShowOthersDreams ] = useState(true)

    // initialization effect hook to get dreams
    useEffect(() => {
        if (props.match) {
            if (props.match.path === '/all-dreams/my-dreams') {
                if (profile.user) {
                    getDreamsByUser(profile.user.id)
                    setShowOthersDreams(false)
                }
            }
        }
        else {
            getAllDreams()
            setShowOthersDreams(true)
        }
    }, [])
    
    showOthersDreams ? console.log('dreams', dreams) : console.log('myDreams', myDreams)

    return (
    <>
    </>
    )
}