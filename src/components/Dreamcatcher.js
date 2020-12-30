import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
// import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ProfileProvider } from "./auth/AuthProvider"


export const Dreamcatcher = () => (
    <>
    <ProfileProvider>
        <Route render={() => {
            if (localStorage.getItem("dreamcatcher_user_id")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={(props) => {
            if (localStorage.getItem("dreamcatcher_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login {...props} />
            }
        }} />

        <Route path="/register" render={(props) => {
            if (localStorage.getItem("dreamcatcher_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Register history={props.history} />
            }
        }} />
    </ProfileProvider>
    </>
)