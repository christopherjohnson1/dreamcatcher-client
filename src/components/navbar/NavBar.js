import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import "./NavBar.css"
import Img from '../img/dream-catcher-logo.png'
import { useContext } from 'react'
import { ProfileContext } from '../auth/AuthProvider'

export const NavBar = (props) => {
    const { profile } = useContext(ProfileContext)

    return (
        <>
            <Navbar variant="dark" className="dreamcatcher-navbar d-flex fixed-top container navbar-collapse">
                <Navbar.Brand>
                    <img
                        src={Img}
                        // className="d-inline-block align-top"
                        alt="dreamcatcher logo"
                        />
                </Navbar.Brand>
                    <ul className="navbar__actual">
                            <Button variant="primary" size="sm" className="navbar__link" onClick={() => props.history.push("/")}>New Dream</Button>
                            <Button variant="primary" size="sm" className="navbar__link" onClick={() => props.history.push("/all-dreams")}>All Dreams</Button>
                            <Button variant="primary" size="sm" className="navbar__link" onClick={() => props.history.push("/all-dreams/my-dreams")}>My Dreams</Button>
                            <Button variant="primary" size="sm" className="navbar__link" onClick={() => props.history.push("/dream-land")}>Dream Land</Button>
                            <Button variant="dark" size="lg" className="navbar__link" onClick={() => props.history.push(`/dreamcatcher-profile/${profile.id}`)}><img className="profile-photo-small" src={profile.profile_photo} alt="" /></Button>
                    </ul>
            </Navbar>
        </>
    )
}