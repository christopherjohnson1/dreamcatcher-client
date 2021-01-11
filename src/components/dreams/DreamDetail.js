import React, { useContext, useEffect, useState } from "react"
import { DreamsContext } from "./DreamsProvider"
import { ProfileContext } from "../auth/AuthProvider"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./DreamDetail.css"

export const DreamDetail = (props) => {
    const { getSingleDream, singleDream, deleteDream } = useContext(DreamsContext)
    const { profile } = useContext(ProfileContext)

    useEffect(() => {
        const dreamId = parseInt(props.match.params.dreamId)
        getSingleDream(dreamId)
    }, [])

    const [deleteWarning, setDeleteWarning] = useState(false)

    const profileMatch = profile.id === singleDream.user_id

    return (
        <div className="container">
            <div>
                <div className="dream-detail mb-3">
                    <Row>
                        <Col className="user-image"
                        onClick={() => {props.history.push(`/dreamcatcher-profile/${singleDream.user && singleDream.user.id}`)}}>
                            <img className="profile-photo" src={singleDream.user && singleDream.user.profile_photo} alt="" />
                            <h4>{singleDream.user && singleDream.user.full_name}</h4>
                        </Col>
                        <Col className="text-right"><h3>{singleDream.title}</h3></Col>
                    </Row>
                </div>
                <Card body>
                    <Container className="test">
                        
                        <Row>
                            <Col className="text-center pt-4">{singleDream.dream_story}</Col>
                        </Row>
                    </Container>
                </Card>
            </div>
            <div className="mt-3">
                <Row>
                    <Col><p className="text-left"><b>Dream Type:</b> {singleDream.dream_type && singleDream.dream_type.label}</p></Col>
                    <Col><p className="text-right"><b>Exercise Type:</b> {singleDream.exercise && singleDream.exercise.exercise_type}</p></Col>
                </Row>
                <Row>
                    <Col><p className="text-left"><b>Any stressors:</b> {singleDream.stress && singleDream.stress.stress_event}</p></Col>
                    <Col><p className="text-right"><b>Moon Phase:</b> {singleDream.moon_phase && singleDream.moon_phase.label}</p></Col>
                </Row>
                <Row>
                    <Col className="text-left"><b>Dream Date:</b> {singleDream.date}</Col>
                </Row>
                <>
                { deleteWarning
                ? <div className="alert alert-danger" role="alert">
                Are you sure you want to delete this post?
                <button className = "btn btn-secondary mx-3" onClick={() => {deleteDream(singleDream.id).then(props.history.push('/all-dreams/my-dreams'))}}>Yes, delete</button>
                <button className = "btn btn-secondary mx-3" onClick={() => {setDeleteWarning(false)}}>No, cancel</button>
                </div>
                : ''
                }
                </>
                <Row>
                    
                </Row>
                <Row>
                    {profileMatch ? 
                        <>
                        <Col className="text-center mt-5 mb-5">
                            <Button variant="danger" onClick={() => {props.history.push('/all-dreams/my-dreams')}}>Go Back</Button>
                        </Col> 
                        <Col className="text-center mt-5 mb-5">
                            <Button variant="warning" onClick={() => {setDeleteWarning(true)}}>Delete Dream</Button>
                        </Col> 
                        </>
                        :
                        <Col className="text-center mt-5 mb-5">
                            <Button variant="danger" onClick={() => {props.history.push('/all-dreams')}}>Go Back</Button>
                        </Col>
                    }
                </Row>
                
            </div>
        </div>
    )
}