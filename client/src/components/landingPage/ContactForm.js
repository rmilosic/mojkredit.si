import React  from 'react';
import { 
  Container, Row, Col, Button, Form } 
from 'react-bootstrap';



export default function ContactForm(props) {
    const [validated, setValidated] = React.useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();

      console.log("form", form);
      
      console.log("Validation successfull")
      setValidated(true);
    };

    return (
        <Container>
                <Row className="my-4">
                    <Col>
                        <h3>Kontakt</h3>
                    </Col>
                </Row>
                <Row className="justify-content-lg-between">
                    <Col lg={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Row>
                                    <Col>
                                        <Form.Label>Vaše ime</Form.Label>
                                        <Form.Control type="text"/>
                                    </Col>
                                    
                                    <Col>
                                        <Form.Label>Vaš e-naslov</Form.Label>
                                        <Form.Control type="email"/>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <Form.Label>Sporočilo</Form.Label>
                                        <Form.Control as="textarea" rows="8"/>
                                    </Col>
                                </Row>

                            

                            
                            <Button className="my-4" variant="primary" type="submit">
                                Pošlji
                            </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    
                    <Col className="pt-3" lg={5}>
                        <p>
                            <strong>Finster d.o.o</strong><br/>Ulica Lackove čete 9,&nbsp;2250 Ptuj<br/>Matična številka: 8625913000<br/>
                            E-naslov: <a href="mailto:info@finster.si">info@finster.si</a>
                            <br/> 
                            P: +386 30 604 077
                            <br/>
                            
                        </p>
                    </Col>
                </Row>
            </Container>
    )
}