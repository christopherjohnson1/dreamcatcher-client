import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import "./NavBar.css"
import Img from '../img/dream-catcher-logo.png'

export const NavBar = (props) => {

    return (
        <>
            <Navbar variant="light" className="dreamcatcher-navbar d-flex fixed-top">
                <Navbar.Brand>
                    <img
                        src={Img}
                        // className="d-inline-block align-top"
                        alt="dreamcatcher logo"
                        />
                </Navbar.Brand>
                    <ul className="navbar__actual">
                            <Button variant="primary" size="lg" className="navbar__link" onClick={() => props.history.push("/")}>New Dream</Button>
                            <Button variant="primary" size="lg" className="navbar__link" onClick={() => props.history.push("/all-dreams")}>All Dreams</Button>
                            <Button variant="primary" size="lg" className="navbar__link" onClick={() => props.history.push("/all-dreams/my-dreams")}>My Dreams</Button>
                            <Button variant="danger" size="lg" className="navbar__link" onClick={() => props.history.push("/logout")}>Logout</Button>
                    </ul>
            </Navbar>
        </>
    )
}