import React, { useContext, useEffect } from "react"
import { DreamcatcherProfileContext } from "./DreamcatcherProfileProvider"
import { DreamsContext } from "../dreams/DreamsProvider"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./DreamcatcherProfileDetail.css"

export const DreamcatcherProfileDetail = (props) => {
    const { getSingleProfile, profile } = useContext(DreamcatcherProfileContext)
    const { getDreamsByUser, myDreams } = useContext(DreamsContext)

    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getSingleProfile(userId)
        getDreamsByUser(userId)
    }, [])


    return (
        <div className="container">
            <div>
                <div className="dream-detail mb-3">
                    <div>
                        <Col className="text-center"><img className="profile-photo" src={profile.profile_photo} alt="" /></Col>
                    </div>
                    <Row>
                        <Col className="text-center"><h2>{profile.user && profile.user.first_name} {profile.user && profile.user.last_name}</h2></Col>
                    </Row>
                </div>
                <Card body>
                    <Container className="test">
                        
                        <Row>
                        <Col className="text-center pt-y mb-2"><h4>Bio</h4></Col>
                        </Row>
                        <Row>
                            <Col className="text-center">{profile.bio}</Col>
                        </Row>
                    </Container>
                </Card>
            </div>
            
            <div className="text-center py-3"> <h4><b>My Dreams</b></h4>
                {
                    myDreams.map(d => {
                        return <Card body className="my-3 d-flex dream-card"
                        onClick={() => {props.history.push(`/dream-detail/${d.id}`)}}>
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
                    })
                }
            </div>
            <div className="mt-3 mb-5">
                <Row>
                    <Col className="text-center mt-5">
                        <Button variant="danger" className="mx-4" onClick={() => {props.history.push('/all-dreams')}}>Go Back</Button>
                    </Col>
                    <Col className="text-center mt-5">
                        <Button variant="warning" className="mx-4" onClick={() => {props.history.push('/logout')}}>Logout</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}