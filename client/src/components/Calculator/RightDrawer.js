
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


import { 
    Nav, Navbar, Container, Row, Col, Image, Button, Form } 
  from 'react-bootstrap';


// import CreditType from './CreditType';
// import CreditAmount from './CreditAmount';
// import CreditInsurance from './CreditInsurance';
// import CreditTime from './CreditTime';

import SideConfig from './SideConfig';

const useStyles = makeStyles({
  paperAnchorRight: {
    backgroundColor: 'white',
  },
});


export default function RightDrawer(props) {
  
    const handleSubmit = (event) => {
        props.toggleDrawer(event);
        props.gatherCalculations(props.activeBanks, props.creditAmount, props.creditType, props.creditTime, props.creditInsurance);
    }

  return (
    <div>
        <React.Fragment>
          <Drawer anchor={'right'} open={props.state} onClose={props.toggleDrawer}>
            

            {/* <Container>
              <Row>
                <Col>
                  <h4 className="mt-2 text-muted">Nastavitve</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p><strong>Vrsta kredita</strong></p>
                  <CreditType creditType={props.creditType} handleChange={props.handleChange} 
                  availableBankSkills={props.availableBankSkills} />
                </Col>
              </Row>

              <Row>
                <Col>
                  <p><strong>Vrsta zavarovanja</strong></p>
                  <CreditInsurance creditInsurance={props.creditInsurance} handleChange={props.handleChange} />
                </Col>
              </Row>

              <Row>
                <Col>
                  <p className="pt-2"><strong>Znesek kredita</strong></p>
                  <CreditAmount creditAmount={props.creditAmount} 
                  creditType={props.creditType}
                  creditInsurance={props.creditInsurance}
                  activeBanks={props.activeBanks}
                  handleChange={props.handleChange} 
                  inputType="field"/>
                </Col>
              </Row>

              <Row>
                <Col>
                  <p className="pt-2"><strong>Čas odplačila</strong></p>    
                  <CreditTime 
                  creditType={props.creditType}
                  creditInsurance={props.creditInsurance}
                  creditTime={props.creditTime} 
                  activeBanks={props.activeBanks}
                  handleChange={props.handleChange} 
                  inputType="field"/>
                </Col>
              </Row>

              <Row className="mt-3 justify-content-center">
                <Col>
                  <Button variant="primary" onClick={handleSubmit}>Potrdi</Button>
                </Col>
              </Row>
            </Container> */}
            <Container>

            
            <SideConfig 
            creditType={props.creditType}
            creditAmount={props.creditAmount}
            creditTime={props.creditTime}
            creditAffiliation={props.creditAffiliation}
            creditInsurance={props.creditInsurance}
            handleChange={props.handleChange} 
            handleFinishClick={props.handleFinishClick}
            availableBankSkills={props.availableBankSkills}
            activeBanks={props.activeBanks}
            gatherCalculations={props.gatherCalculations}
            />
            <Row className="mt-3 justify-content-center">
                <Col>
                  <Button variant="primary" onClick={handleSubmit} block>Potrdi</Button>
                </Col>
              </Row>
            </Container>
          </Drawer>
        </React.Fragment>
    </div>
  );
};
