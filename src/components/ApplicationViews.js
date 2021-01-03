import React from "react"
import { Route } from "react-router-dom"

export const ApplicationViews = (props) => {

    return (

        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("dreamcatcher_user_id")
                props.history.push("/login")
            }
        } />
    )
}