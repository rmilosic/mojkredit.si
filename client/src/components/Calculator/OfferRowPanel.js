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


class OfferRowPanel extends Component {
    imgMapper = {
        "skb": SkbLogo,
        "sberbank": SberbankLogo,
        "sparkasse": SparkasseLogo,
        "unicredit": UnicreditLogo,
        "gorenjska": GorenjskaLogo,
        "abanka": AbankaLogo
    };

    render() {
        
        return(
                
                <div>
                   
                <ExpansionPanel bgcolor="white">
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        
                        <Row className="py-3 justify-content-between">
                            <Col xs={8} md={4} lg={4}>
                                <Image className="d-block"
                                src={this.imgMapper[this.props.bankName]}
                                alt={this.props.bankName}
                                fluid
                                /> 
                            </Col>
                       
                            <Col xs={12} md={4} lg={6}>
                                <p className="mt-3 mt-sm-4 mt-md-0">
                                    <span className="d-sm-inline d-lg-block">Skupni znesek: </span>
                                    <span className="text-success h4">{this.props["totalAmountPaid"]} €</span>
                                </p>
                            </Col>
                        </Row>

            
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={12}><Typography>Mesečna anuiteta: <strong>{this.props["monthlyAnnuity"]} €</strong></Typography></Grid>
                            <Grid item xs={12}><Typography>Letna obrestna mera: <strong>{this.props["annualInterestRate"]} %</strong></Typography></Grid>
                            <Grid item xs={12}><Typography>Efektivna obrestna mera: <strong>{this.props["effectiveInterestRate"]} %</strong></Typography></Grid>
                            <Grid item xs={12}><Typography>Skupni stroški kredita: <strong>{this.props["totalLoanCost"]} €</strong></Typography></Grid>
                        
                        </Grid>
                         {/* <p>Letna obrestna mera: {this.props["annualInterestRate"]}</p>
                        <p>Efektivna obrestna mera: {this.props["effectiveInterestRate"]}</p>
                         <p>Skupni stroški kreditaanuiteta: {this.props["totalLoanCost"]}</p>*/}
                       
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Box m={3}/>
                </div>
      
        );
    }
}

export default OfferRowPanel;