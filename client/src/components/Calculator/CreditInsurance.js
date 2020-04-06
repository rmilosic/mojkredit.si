import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';


import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { 
    Nav, Navbar, Container, Row, Col, Image, Button, Form } 
  from 'react-bootstrap';

class CreditInsurance extends Component {

    render() {
        return(

            <Row>
                <Col>
                    <RadioGroup aria-label="creditInsurance" name="creditInsurance" value={this.props.creditInsurance} onChange={this.props.handleChange}>
                        <FormControlLabel value="insurance" control={<Radio />} label="Zavarovalna premija" />
                        <FormControlLabel value="mortgage" control={<Radio />} label="Nepremičnina" />
                    </RadioGroup>
                </Col>
            </Row>
            

        );
    }
}
      
export default CreditInsurance;