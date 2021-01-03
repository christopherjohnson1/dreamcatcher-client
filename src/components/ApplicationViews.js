import React from "react"
import { Route } from "react-router-dom"
import { NewDream } from "./newdream/NewDream"

export const ApplicationViews = (props) => {

    return (
        <>
        <Route exact path="/new-dream" render={(props) => {
            return <NewDream {...props} />
        }} />
        
        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("dreamcatcher_user_id")
                props.history.push("/login")
            }
        } />
        </>
    )
}