import React, { useContext, useEffect, useState } from 'react'
import { DreamsContext } from './DreamsProvider'
import { ProfileContext } from '../auth/AuthProvider'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './AllDreams.css'

export const AllDreams = props => {
    const { getAllDreams, dreams, getDreamsByUser, myDreams } = useContext(DreamsContext)
    const { profile } = useContext(ProfileContext)

    const [ showOthersDreams, setShowOthersDreams ] = useState(true)

    const [view, setView] = useState('all')


    // initialization effect hook to get dreams
    useEffect(() => {
        if (props.match) {
            if (props.match.path === '/all-dreams/my-dreams') {
                if (profile.user) {
                    getAllDreams()
                    getDreamsByUser(profile.user.id)
                    setView('mydreams')
                    setShowOthersDreams(false)
                }
            }
        }
        else {
            getAllDreams()
            setShowOthersDreams(true)
        }
    }, [profile, props.match])
    

    return (
    <>
        <div className="all-dreams container">
            <h1 className="text-center">
                {view === 'mydreams' ? 'My' : 'All'} Dreams
            </h1>

            {showOthersDreams ?
                // Show the dreams in the all dreams list that are not marked private
                dreams.map(d => {
                    if (!d.private) {
                        return <Card body className="my-3 d-flex dream-card"
                                    onClick={() => {props.history.push(`/dream-detail/${d.id}`)}}>
                                <Container>
                                    <Row>
                                        <Col>{d.date}</Col>
                                        <Col className="text-center">{d.title}</Col>
                                        <Col className="text-center"><img className="profile-photo-small" src={d.user.profile_photo} alt="" /></Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center pt-4">{d.dream_type.label}</Col>
                                    </Row>
                                </Container>
                            </Card>
                    }
                }) 
                : myDreams.map(d => {
                    return <Card body className="my-3 d-flex dream-card"
                    onClick={() => {props.history.push(`/new-dream/edit/${d.id}`)}}>
                    <Container>
                        <Row>
                            <Col>{d.date}</Col>
                            <Col className="text-center">{d.title}</Col>
                            <Col className="text-center">{profile.full_name}</Col>
                        </Row>
                        <Row>
                            <Col className="text-center pt-4">{d.dream_type.label}</Col>
                        </Row>
                    </Container>
                </Card>
                })}

        </div>
    </>
    )
}