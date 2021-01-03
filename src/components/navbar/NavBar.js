import { Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import "./NavBar.css"
import Img from '../img/dream-catcher.png'

export const NavBar = (props) => {

    return (
        <>
            <Navbar bg="dark" variant="dark" className="revolving-navbar d-flex justify-content-center fixed-top">
                    <ul className="navbar__actual">
                            <Button variant="primary" className="navbar__link" onClick={() => props.history.push("/new-dream")}>New Dream</Button>
                            <Button variant="primary" className="navbar__link" onClick={() => props.history.push("/all-dreams")}>All Dreams</Button>
                            <Button variant="primary" className="navbar__link" onClick={() => props.history.push("/dream-land")}>Dream Land</Button>
                            <Button variant="danger" className="navbar__link" onClick={() => props.history.push("/logout")}>Logout</Button>
                    </ul>
            </Navbar>
            <img src={Img} alt="dreamcatcher logo" />
        </>
    )
}