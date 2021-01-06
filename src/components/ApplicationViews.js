import React from "react"
import { Route } from "react-router-dom"
import { DreamsProvider } from './dreams/DreamsProvider'
import { DreamTypeProvider } from './dreamtype/DreamTypeProvider'
import { ExerciseTypeProvider } from './exercise/ExerciseTypeProvider'
import { MoonPhaseProvider } from './moonphase/MoonPhaseProvider'
import { StressTypeProvider } from './stress/StressTypeProvider'
import { ProfileProvider } from './auth/AuthProvider'
import { DreamcatcherProfileProvider } from './profile/DreamcatcherProfileProvider'
import { DreamcatcherProfileDetail } from './profile/DreamcatcherProfileDetail'
import { NewDream } from "./dreams/NewDream"
import { AllDreams } from './dreams/AllDreams'
import { DreamDetail } from './dreams/DreamDetail'

export const ApplicationViews = (props) => {

    return (
        <>
        <DreamsProvider>
            <DreamTypeProvider>
                <ExerciseTypeProvider>
                    <MoonPhaseProvider>
                        <StressTypeProvider>
                            <ProfileProvider>

                            <Route exact path="/all-dreams" render={(props) => {
                                return <AllDreams {...props} />
                            }} />
                            
                            <Route exact path="/all-dreams/my-dreams" render={(props) => {
                                return <AllDreams {...props} />
                            }} />

                            <Route exact path="/" render={(props) => {
                                return <NewDream {...props} />
                            }} />

                            <Route exact path="/new-dream/edit/:dreamId(\d+)" render={props => {
                                    return <NewDream {...props} />
                                    }} />
                            
                            <Route exact path="/dream-detail/:dreamId(\d+)" render={props => {
                                    return <DreamDetail {...props} />
                                    }} />

                            </ProfileProvider>
                        </StressTypeProvider>
                    </MoonPhaseProvider>
                </ExerciseTypeProvider>
            </DreamTypeProvider>
        </DreamsProvider>

        <DreamcatcherProfileProvider>
            <DreamsProvider>

        <Route exact path="/dreamcatcher-profile/:userId(\d+)" render={props => {
                return <DreamcatcherProfileDetail {...props} />
                }} />

            </DreamsProvider>
        </DreamcatcherProfileProvider>

        
        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("dreamcatcher_user_id")
                props.history.push("/login")
            }
        } />

        </>
    )
}