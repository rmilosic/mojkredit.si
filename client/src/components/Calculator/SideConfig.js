import React from 'react';


import { 
   Container, Row, Col, Button } 
  from 'react-bootstrap';


import CreditType from './CreditType';
import CreditAmount from './CreditAmount';
import CreditInsurance from './CreditInsurance';
import CreditTime from './CreditTime';

export default function SideConfig(props) {
      
    // const handleSubmit = (event) => {
    //     props.gatherCalculations(props.activeBanks, props.creditAmount, props.creditType, props.creditTime, props.creditInsurance);
    // }
    
    return (
            <div>
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
              </div>

              
        )
}