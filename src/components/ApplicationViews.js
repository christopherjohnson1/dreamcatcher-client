import React from "react"
import { Route } from "react-router-dom"
import { DreamsProvider } from './dreams/DreamsProvider'
import { DreamTypeProvider } from './dreamtype/DreamTypeProvider'
import { ExerciseTypeProvider } from './exercise/ExerciseTypeProvider'
import { NewDream } from "./dreams/NewDream"
import { AllDreams } from './dreams/AllDreams'

export const ApplicationViews = (props) => {

    return (
        <>
        <DreamsProvider>
            <DreamTypeProvider>
                <ExerciseTypeProvider>
                    <Route exact path="/all-dreams" render={(props) => {
                        return <AllDreams {...props} />
                    }} />
                    <Route exact path="/new-dream" render={(props) => {
                        return <NewDream {...props} />
                    }} />
                </ExerciseTypeProvider>
            </DreamTypeProvider>
        </DreamsProvider>
        
        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("dreamcatcher_user_id")
                props.history.push("/login")
            }
        } />

        </>
    )
}