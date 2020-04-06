import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { 
  Nav, Navbar, Container, Row, Col, Image, Form } 
from 'react-bootstrap';

import CreditType from './CreditType';
import CreditAmount from './CreditAmount';
import CreditTime from './CreditTime';
import CreditInsurance from './CreditInsurance';
import { Card, CardContent } from '@material-ui/core';



const getSteps = function() {
  return ['Vrsta', 'Zavarovanje', 'Znesek & doba'];
}

class CreditFormStepper extends Component {
  
  
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      skipped: new Set(),
      steps: getSteps(),
      hideForm: false
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
    /*this.handleFinishClick = this.handleFinishClick.bind(this);
    this.showForm = this.showForm.bind(this);*/
  }

  
  
  getStepContent(step) {
    switch (step) {
      case 0:
        return (
        <div> 
          <Row>
            <Col>
                <h4>Izberite vrsto kredita</h4>
            </Col>
          </Row>
          <CreditType creditType={this.props.creditType} handleChange={this.props.handleChange} availableBankSkills={this.props.availableBankSkills}/>
         </div>
        );
      case 1:
        return (
          <div> 
            <Row>
            <Col>
                <h4>Vrsta zavarovanja</h4>
            </Col>
            </Row>
            <CreditInsurance creditInsurance={this.props.creditInsurance} handleChange={this.props.handleChange} />
          </div>
        );
      case 2:
        return (
          <div>
            <Row>
            <Col>
                <h4 className="pb-4">Znesek kredita (v Evrih)</h4>
            </Col>
            </Row>
            <CreditAmount 
            creditAmount={this.props.creditAmount} 
            creditType={this.props.creditType}
            creditInsurance={this.props.creditInsurance}
            activeBanks={this.props.activeBanks}
            handleChange={this.props.handleChange}
            setCreditAmount={this.props.setCreditAmount}
            inputType="slider" />

            <Row>
            <Col>
                <h4 className="pb-4">Čas odplačila (v letih)</h4>
            </Col>
            </Row>  
            <CreditTime 
            creditType={this.props.creditType}
            creditInsurance={this.props.creditInsurance}
            creditTime={this.props.creditTime} 
            activeBanks={this.props.activeBanks}
            handleChange={this.props.handleChange} 
            setCreditTime={this.props.setCreditTime}
            inputType="slider" />
          </div>
          );
      default:
        return 'Unknown step';
    }
  }


  isStepOptional(step){
    return false;
  };

  isStepSkipped(step){
    return this.state['skipped'].has(step);
  };

  handleNext(){
    console.log(this.state['skipped']);
    console.log(this.state);
    let activeStep = this.state['activeStep'];
    let newSkipped = this.state['skipped'];

    if (this.isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(this.state['activeStep']);
    }

    this.setState({ activeStep: this.state['activeStep'] + 1 });

  };

  handleBack(){
    this.setState({ activeStep: this.state['activeStep'] - 1 });
  };


  handleReset(){
    this.setState({ activeStep: 0});
  };


  render() {
    return ( 
        
        <div>
          
          <Stepper className="mt-3" activeStep={this.state['activeStep']} alternativeLabel>
            {this.state['steps'].map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (this.isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (this.isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                
              </Step>
              );
            })}
          </Stepper>
          


          <Card>
            <CardContent>
                  {this.getStepContent(this.state['activeStep'])}
                <Button disabled={this.state['activeStep'] === 0} onClick={this.handleBack}>
                  Nazaj
                </Button>
                {this.state['activeStep'] === this.state['steps'].length - 1  ? (
                <Button variant="contained" color="primary" onClick={this.props.handleFinishClick}>Izračunaj</Button>
                ) : (
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  Naprej
                </Button>
                )}
            </CardContent>

          </Card>
          
              
            

            
            
        </div>
  
    )}};


      
export default CreditFormStepper;