import React  from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography, Box } from '@material-ui/core';

// import components
import SimpleTabs from '../components/SimpleTabs';
// import SimpleMenu from '../components/SimpleMenu';

// import images
import finsterLight from '../resources/img/finster-light-new.svg';
// import finsterDark from '../resources/img/finster-dark.svg';
import timelinePNG from '../resources/img/timeline-new.svg';
import langingPageGraphic from '../resources/img/landing-graphic-phone.svg';


import { 
    Nav, Navbar, Container, Row, Col, Image, Button, Form } 
from 'react-bootstrap';

function LandingPage() {
    return (
        <div>
        {/* NAVIGATION COMPONENT  -- MOBILE*/} 
        <Container>
            <Row>
                <Navbar>
                    <Col xs={5} lg={3}>
                        <Navbar.Brand href="/">
                            <Image 
                                src={finsterLight}
                                alt="Finster Logo"
                                fluid
                            />
                        </Navbar.Brand>
                    </Col>
                    <Col xs={7} lg={9}>
                        <Nav className="justify-content-end" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link href="#o-nas">O nas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#opis-resitev">Opis rešitev</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#kontakt">Kontakt</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Navbar> 
            </Row>
         {/* <SimpleMenu/> */}
        
        <Row>
            <Col xs={12} md={6} lg={5}>
                <Box pt={15}>
                    <Image alt="Finster idea"
                     src={langingPageGraphic}
                     fluid/> 
                </Box>

            </Col>

            <Col xs={12} md={6} lg={5} className="text-center">
                <Box mt={15}>
                {/* MAIN MESSAGE */}
                    <h1 className="text-center">Razvijamo rešitve za optimizacijo procesov izdaje in pridobitve kreditov.</h1>
                    <Box mt={6}>
                        <a href="#o-nas"><ExpandMoreIcon fontSize="large" style={{fontSize: 7 + 'em'}}/></a>                            
                    </Box>
                </Box>
            </Col>

        </Row>
    
        </Container>
       
              

        {/* TABS */}
        <section id="opis-resitev" className="text-center">
        
            <SimpleTabs/>
            
        </section>
             
        {/* TIMELINE */}
        <section>
            <Container>
                <Row className="text-center">
                    <Col xs={12} lg={5}>
                        <Typography variant="h5">Zbirnik informativnih izračunov si že lahko ogledate:</Typography>
                        <Box pt={3} pb={3}>
                            <Button href="/izracun-kredita">DEMO</Button>
                        </Box>
                    </Col>
                    <Col xs={12} lg={7}>
                        <Image src={timelinePNG} fluid/>
                    </Col>
                </Row>
            </Container>
                
        </section>
        
        <section id="kontakt" className="bg-dark text-white">
            <Container>
                <Row>
                    <Col>
                        <Typography variant="h3">Kontakt</Typography>
                    </Col>
                </Row>
                <Row className="justify-content-lg-between">
                    <Col lg={6}>
                        <Form>
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
                                <Row>
                                    <Col>
                                        <Form.Label>Sporočilo</Form.Label>
                                        <Form.Control as="textarea" rows="8"/>
                                    </Col>
                                </Row>

                            </Form.Group>

                            
                            <Button variant="primary" type="submit">
                                Pošlji
                            </Button>
                        </Form>
                    </Col>
                    
                    <Col lg={5}>
                        <Typography variant="p">
                            <strong>Finster d.o.o</strong><br/>Ulica Lackove čete 9,&nbsp;2250 Ptuj<br/>Matična številka: 8625913000<br/>
                            E-naslov: <a href="mailto:info@finster.si">info@finster.si</a>
                            <br/> 
                            P: +386 30 604 077
                            <br/>
                            
                        </Typography>
                    </Col>
                </Row>
            </Container>

        </section>
        

        </div>
    )
}

export default LandingPage;