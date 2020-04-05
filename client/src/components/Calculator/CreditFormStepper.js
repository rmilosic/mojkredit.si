import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CreditType from './CreditType'
/*import CreditAffiliation from './CreditAffiliation'*/
import CreditAmount from './CreditAmount'
import CreditInsurance from './CreditInsurance'
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
        return <CreditType creditType={this.props.creditType} handleChange={this.props.handleChange} 
        availableBankSkills={this.props.availableBankSkills} />;
      case 1:
        return <CreditInsurance creditInsurance={this.props.creditInsurance} handleChange={this.props.handleChange} />;
      case 2:
        return <CreditAmount creditAmount={this.props.creditAmount} 
        creditType={this.props.creditType}
        creditInsurance={this.props.creditInsurance}
        creditTime={this.props.creditTime} 
        creditValueRangeMapper={this.props.creditValueRangeMapper}
        activeBanks={this.props.activeBanks}
        handleChange={this.props.handleChange} />;
      default:
        return 'Unknown step';
    }
  }

  getStepTitle = (step) => {
    switch (step) {
      case 0:
        return "Izberite vrsto kredita";
      case 1:
        return "Izberite način zavarovanja";
      case 2:
        return null;
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
          
          <Stepper activeStep={this.state['activeStep']} alternativeLabel>
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
               <Typography variant="h4">{this.getStepTitle(this.state['activeStep'])}</Typography> 
               <Box mb={3}>
                  {this.getStepContent(this.state['activeStep'])}
               </Box>
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