import React  from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box } from '@material-ui/core';

// import components
import SimpleTabs from '../components/SimpleTabs';
import SimpleMenu from '../components/SimpleMenu';
import ContactForm from '../components/landingPage/ContactForm';

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
                    <Col xs={6} lg={3}>
                        <Navbar.Brand href="/">
                            <Image 
                                src={finsterLight}
                                alt="Finster Logo"
                                fluid
                            />
                        </Navbar.Brand>
                    </Col>
                    <Col className="d-none d-lg-inline" xs={6} lg={9}>
                        
                        <Nav className="justify-content-end">
                            
                                <Nav.Item>
                                    <Nav.Link href="#opis-resitev">Opis rešitev</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#kontakt">Kontakt</Nav.Link>
                                </Nav.Item>
                            
                        </Nav>
                            
                    </Col>
                    <Col className="d-lg-none" >
                        <Nav className="justify-content-end">
                            <SimpleMenu/>
                        </Nav>
                    </Col>
                </Navbar> 
            </Row>
        
        <Row className="justify-content-center">
            <Col className="mt-3 mt-md-5 mt-lg-5" xs={12} md={6} lg={5}>
            
                <Image className="mt-5" alt="Finster idea"
                    src={langingPageGraphic}
                    fluid/> 
            

            </Col>

            <Col className="text-center mt-2 mt-md-5 mt-lg-5" xs={12} md={6} lg={5} >
            
                {/* MAIN MESSAGE */}
                <h2 className="text-center mt-lg-5">Razvijamo rešitve za optimizacijo procesov izdaje in pridobitve kreditov.</h2>
                <div className="mt-lg-5">
                    <a href="#opis-resitev"><ExpandMoreIcon fontSize="large" style={{fontSize: 7 + 'em'}}/></a>                            
                </div>
            
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
                <Row className="text-center justify-content-center">
                    <Col xs={10} md={8} lg={5}>
                        <h5>Zbirnik informativnih izračunov si že lahko ogledate:</h5>
                        <Box pt={3} pb={3}>
                            <Button href="/izracun-kredita">DEMO</Button>
                        </Box>
                    </Col>
                    <Col xs={10} md={8} lg={7}>
                        <Image src={timelinePNG} fluid/>
                    </Col>
                </Row>
            </Container>
                
        </section>
        
        {/* Contact - form */}
        <section id="kontakt" className="bg-dark text-white p-4">
            <ContactForm/>
        </section>
        

        </div>
    )
}

export default LandingPage;