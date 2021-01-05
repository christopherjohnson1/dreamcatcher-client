import React, { useContext, useEffect } from 'react'
import { DreamsContext } from './DreamsProvider'
import './AllDreams.css'

export const AllDreams = () => {
    const { getAllDreams, dreams } = useContext(DreamsContext)

    // initialization effect hook to get dreams
    useEffect(() => {
        getAllDreams()
    }, [])
    console.log('dreams', dreams)

    return (
    <>
    </>
    )
}