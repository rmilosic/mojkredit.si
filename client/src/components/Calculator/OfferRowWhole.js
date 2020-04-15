import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Grid, Typography, Box } from '@material-ui/core';
import { 
    Nav, Navbar, Container, Row, Col, Image, Button, Form } 
  from 'react-bootstrap';

// images
import SkbLogo from '../../resources/img/skb-logo-otp.png';
import SberbankLogo from '../../resources/img/sberbank-logo-png-2.png';
import SparkasseLogo from '../../resources/img/sparkasse-logo.png';
import UnicreditLogo from '../../resources/img/unicredit-logo.jpg';
import GorenjskaLogo from '../../resources/img/gorenjska-logo.jpg';
import AbankaLogo from '../../resources/img/abanka-logo.png';


// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function OfferRowPanel(props) {
    
    const imgMapper = {
        "skb": SkbLogo,
        "sberbank": SberbankLogo,
        "sparkasse": SparkasseLogo,
        "unicredit": UnicreditLogo,
        "gorenjska": GorenjskaLogo,
        "abanka": AbankaLogo
    };

        
    return(
            
            <div className="bg-white shadow-sm rounded m-4 p-4">
            
                
                {/* logo & title */}
                <Row className="py-3">
                    <Col xs={6} md={4}>
                        <Image className="d-block"
                            src={imgMapper[props.bankName]}
                            alt={props.bankName}
                            fluid
                            /> 
                    </Col>
                    <Col><small>{props["offerTitle"]}</small></Col>

                </Row>

                {/* Details */}
                <Row>
                    {/* numbers */}
                    <Col xs={12} md={9}>
                        <Row>
                            {/* skupni znesek */}
                            <Col  xs={6} md={3}>
                                    
                                    <span className="d-block text-success text-center"><strong>{props["totalAmountPaid"]} €</strong></span>
                                    <span className="d-block text-center">Skupni znesek</span>
                                
                            </Col>
                            <Col xs={6} md={3}>
                                <p>
                                    <span className="d-block text-center"><strong>{props["monthlyAnnuity"]} €</strong></span>
                                    <span className="d-block text-center">Mesečna anuiteta</span>
                                </p>
                            </Col>
                            <Col xs={6} md={3}>
                                <p>
                                    <span className="d-block text-center"><strong>{props["effectiveInterestRate"]} %</strong></span>
                                    <span className="d-block text-center">Efektivna obrestna mera</span>
                                </p>
                            </Col>
                            <Col xs={6} md={3}>
                                <p>
                                    
                                    <span className="d-block text-center"><strong>{props["totalLoanCost"]} €</strong></span>    
                                    <span className="d-block text-center">Skupni stroški</span>
                                </p>
                            </Col>
                        </Row>
                    </Col>

                    {/* Buttons */}
                    <Col>
                        <Row>
                            <Col xs={6} md={12}>
                                <Button className="text-white mb-2" variant="secondary" block><strong>Nadaljuj</strong></Button>
                            </Col>
                            <Col xs={6} md={12}>
                                <Button variant="outline-light" block>Več info</Button> 
                            </Col>
                        </Row>
                        
                       
                    </Col>
                </Row>
                
                
            </div>
    
    )
    
}
