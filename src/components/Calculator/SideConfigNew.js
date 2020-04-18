import React from 'react';


import { 
   Container, Row, Col, Button, Form  } 
  from 'react-bootstrap';


// import CreditType from './CreditType';
// import CreditAmount from './CreditAmount';
// import CreditInsurance from './CreditInsurance';
// import CreditTime from './CreditTime';

export default function SideConfigNew(props) {
      
    // const handleSubmit = (event) => {
    //     props.gatherCalculations(props.activeBanks, props.creditAmount, props.creditType, props.creditTime, props.creditInsurance);
    // }

    
    var interestRateComparison = props.compareFixedInterestRate ? "fixed" : "variable";
    
    return (
            <div>
              <Row className="mb-2">
                <Col xs={12}>
                  <span className="mt-2 text-muted">Nastavitve</span>
                </Col>
                <Col xs={12} className="align-end">
                  <Button variant="outline-light" size="sm" onClick={props.backToStart} block>Ponastavi</Button> 
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form>
                  <Form.Label><small>Prikazana obrestna mera</small></Form.Label>
                    <Form.Group controlId="filterResults.interestRateType">
                      <Form.Control value={interestRateComparison} as="select" onChange={props.handleComparisonChange} custom>
                        <option value="fixed">Fiksna</option>
                        <option value="variable">Variabilna</option>                        
                      </Form.Control>
                    </Form.Group>
                    </Form>
                </Col>
              </Row>
             
              <Row>
                <Col>
                  <span><small>Razvrsti po</small></span>
                   <Form>
                    <Form.Group controlId="filterResults.filterBy">
                      <Form.Control value={props.SortBy} as="select" onChange={props.handleSortByChange} custom>
                        <option key="totalAmountPaid">Skupni znesek</option>
                        <option value="monthlyAnnuity">Mesečna anuiteta</option>                        
                      </Form.Control>
                    </Form.Group>
                    </Form>
                </Col>
              </Row>
              

            </div>

              
        )
}