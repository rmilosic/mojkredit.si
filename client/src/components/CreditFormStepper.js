import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import FormControl from '@material-ui/core/FormControl';

import CreditType from './CreditType'
/*import CreditAffiliation from './CreditAffiliation'*/
import CreditAmount from './CreditAmount'
import CreditInsurance from './CreditInsurance'


const getSteps = function() {
  return ['Kategorija', 'Znesek & doba', 'Način zavarovanja'];
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
    this.handleFinishClick = this.handleFinishClick.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  
  
  getStepContent(step) {
    switch (step) {
      case 0:
        return <CreditType creditType={this.props.creditType} handleChange={this.props.handleChange} />;
      case 1:
        return <CreditAmount creditAmount={this.props.creditAmount} 
        creditTime={this.props.creditTime} handleChange={this.props.handleChange} />;
      case 2:
        return <CreditInsurance creditInsurance={this.props.creditInsurance} handleChange={this.props.handleChange} />;
      default:
        return 'Unknown step';
    }
  }

  


  isStepOptional = step => {
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

    /*this.setSkipped(newSkipped);*/
  };

  handleBack = () => {
    this.setState({ activeStep: this.state['activeStep'] - 1 });
  };

  /*handleSkip = () => {
    if (!this.isStepOptional(this.state['activeStep'])) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setActiveStep(prevActiveStep => prevActiveStep + 1);
    this.setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(this.state['activeStep']);
      return newSkipped;
    });
  };*/

  handleReset = () => {
    this.setState({ activeStep: 0});
  };

  handleFinishClick() {
    this.setState({ hideForm: true });
    this.props.gatherCalculations();
  }

  showForm(){
    this.setState({ hideForm: false });
    
  }

  render() {
    return ( 
        
        <div>
          { this.state['hideForm'] ? (
            <div>
              <Typography>Form hidden</Typography>
              <Button onClick={this.showForm} 
              variant="contained"
              color="primary">
                    Show Form
              </Button>
            </div>
          ) : (
          <div>
          <Stepper activeStep={this.state['activeStep']}>
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
            
            <Grid item xs={12}>
              <Box mt="2rem"/>
              <FormControl component="fieldset" fullWidth={true}>
                  
              {this.getStepContent(this.state['activeStep'])}
            
            </FormControl>
            
            </Grid>
          
            

            
            {this.state['activeStep'] === this.state['steps'].length - 1  ? (
              
              <Grid item xs={12}>
                <Box mt="2rem"/>
                  
                <Button onClick={this.handleReset}>
                  Ponastavi
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleFinishClick}>Izračunaj</Button>

                </Grid>
            ) : (
                <Grid item xs={12}>
                  <Box mt="2rem"/>

                  <Button disabled={this.state['activeStep'] === 0} onClick={this.handleBack}>
                    Nazaj
                  </Button>
                  {this.isStepOptional(this.state['activeStep']) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSkip}
                    >
                      Skip
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >
                    {this.state['activeStep'] === this.state['steps'].length - 1 ? 'Finish' : 'Naprej'}
                  </Button>
                </Grid>

              )}
              </div>
            )}
            </div>
      );
  }
}


      
export default CreditFormStepper;