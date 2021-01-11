import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const DreamLand = (props) => {

    return (
        <div className="container">
            <div>
                <div className="dream-detail mb-3">
                    <Row>
                        <Col className="text-center"><h2>Interesting Dream Resources</h2></Col>
                    </Row>
                </div>
                <Card body>
                    <Container className="test">
                        
                        <Row>
                            <Col className="text-center pt-y mb-2"><a href="https://www.dreamdictionary.org/" target="_blank" rel="noreferrer">Dream Dictionary | Learn about some of the themes in your dreams</a></Col>
                        </Row>
                        <Row>
                            <Col className="text-center pt-y mb-2"><a href="https://en.wikipedia.org/wiki/Lucid_dream" target="_blank" rel="noreferrer">Lucid Dream wiki | Learn about lucid dreams</a></Col>
                        </Row>
                        <Row>
                            <Col className="text-center pt-y mb-2"><a href="https://www.wikihow.com/Lucid-Dream" target="_blank" rel="noreferrer">How to lucid dream | Steps to help you have lucid dreams</a></Col>
                        </Row>
                    </Container>
                </Card>
            </div>
            
            <div className="mt-3 mb-5">
                <Row>
                    <Col className="text-center mt-5">
                        <Button variant="danger" className="mx-4" onClick={() => {props.history.push('/all-dreams')}}>Go Back</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}