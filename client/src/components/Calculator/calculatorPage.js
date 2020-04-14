import React from 'react';
import { 
  Nav, Navbar, Container, Row, Col, Image, Button, Form } 
from 'react-bootstrap';

import { Grid, FormControl, Box, Typography, Hidden } from '@material-ui/core';

// custom compnents
import CreditFormStepper from './CreditFormStepper';
import {getMinValue, getMaxValue} from './utils.js';
import FormResults from './FormResults';


// images
import finsterLight from '../../resources/img/finster-light-new.svg';


class CalculatorPage extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      formValues: {
        'creditType': 'stanovanjski',
        'creditAmount': null,
        'creditTime': null,
        'creditAffiliation': true,
        'activeBanks': [],
        'creditInsurance': 'insurance'
      },
      // TODO show form options depending on present bankSkills
      bankSkills: {
        'stanovanjski': ['sberbank', 'skb', 'sparkasse', 'unicredit', 'gorenjska', 'abanka'],
        'potrošniški': ['sberbank', 'skb', 'sparkasse', 'unicredit', 'gorenjska'],
        'študentski': ['gorenjska'],
        'hitri': ['sberbank', 'sparkasse', 'unicredit', 'abanka'],
        'gotovinski': ['sberbank', 'abanka']
      },
      offerResults: [],
      creditFormHidden: false,
      compareFixedInterestRate: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.getAvailableBankSkills = this.getAvailableBankSkills.bind(this)
    this.handleFinishClick = this.handleFinishClick.bind(this)
    this.showForm = this.showForm.bind(this)
    this.backToStart = this.backToStart.bind(this)
    // this.getUrl = this.getUrl.bind(this)

  }

  componentDidMount() {
    this.setActiveBanks(this.state.formValues['creditType']);
    // console.log(urlConfigYaml);
  }

  /** 
  * Set state with active banks 
  * @param{String} creditType  type of credit
  */
  setActiveBanks(creditType){
    let newFormValues = this.state.formValues;
    let activeBanks = this.state.bankSkills[creditType]
    newFormValues['activeBanks'] = activeBanks;
    this.setState({formValues: newFormValues});
  }

  /** 
  * Get available bank skills
  * @return {Array} skillsList  list of skills
  */
  getAvailableBankSkills(){
    let skillsList = []
    for (const [key, value] of Object.entries(this.state.bankSkills)) {
      if (value.length) {
        skillsList.push(key);
      }
    }
    return skillsList;
  }
  
  /** 
  * Handle calculator finish click
  */
  handleFinishClick() {
    this.toggleFormVisibility();
  }

  /** 
  * Show creditform stepper
  */
  showForm(){
    this.setState({ creditFormHidden: false });
  }

  /** 
  * Toggle visibility of creditform stepper
  */
  toggleFormVisibility(){
    let formState = this.state.creditFormHidden;
    let newFormState = ( formState ? false : true )
    this.setState({ creditFormHidden: newFormState });
  }


  

  // /** 
  // * Build a url of a given bank with 
  // * @param {String} bankName  Name of the bank
  // * @return   url
  // */
  // getUrl(bankName){

  //   let creditAmount = this.state.formValues["creditAmount"];
  //   let creditType = this.state.formValues["creditType"];
    
  //   let creditInsurance = valueMapper[bankName]["creditInsurance"][this.state.formValues['creditInsurance']]; 
    
  //   // MULTIPLY YEARS WITH 12 TO GET MONTHS
  //   let creditTime = this.state.formValues["creditTime"]*12;  
    
  //   let creditTypeCorrect = this.replaceChars(creditType);
  //   let call_url = `${process.env.LAMBDA_HOST}/${bankName}/${creditTypeCorrect}` + `?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`
    
  //   return call_url
  // }


  // TODO: refractor
  setCreditAmount = (value) => {
    let formValues = this.state.formValues;
    formValues["creditAmount"] = value;
    this.setState({formValues});
  }
  
  setCreditTime = (value) => {
    let formValues = this.state.formValues;
    formValues["creditTime"] = value;
    this.setState({formValues});
  }

  /**
   * Reset the form back to beginning
   */
  backToStart(){
    // empty results
    this.setState({offerResults: []});
    // make stepper visible again
    this.toggleFormVisibility();
  }
  
  /**
   * handle change in form stepper
   * @param {*} event 
   * @param {*} elem 
   * @param {*} value 
   */
  handleChange(event, elem, value){
    let formValues = this.state.formValues;
    let bankSkills = this.state.bankSkills;

    var newValue;
    var name;

    console.log("event", event);
    console.log("element", elem);
    console.log("value", value);
    console.log("event target", event.target);
  
    // select and assign active banks to state when changing creditType
    if (event.target.name === 'creditType') {
      this.setActiveBanks(event.target.value);
    }

    if (event.target.name === 'creditInsurance') {
      console.log('triggered insurance change');

      // trigger function to set min max values for time and amount of credit
      // TODO: edit this
      // let newFormValues = this.state.formValues;
      // let activeBanks = this.state.bankSkills[creditType]
      // newFormValues['creditAmount'] = getMinValue('min_amonunt', formValues['creditInsurance'], formValues['creditType'], activeBanks);
      // this.setState({formValues: newFormValues});

    }

    if (event.target.name) {
      newValue = event.target.value;
      name = event.target.name;
    } else {
      newValue = value; // Field value
      name = elem
    }
    formValues[name] = newValue;
    
    this.setState({formValues, bankSkills})
  }

  render() {

    var availableBankSkills = this.getAvailableBankSkills();
    

    return (
      // LOGO
      <div>
      <Container fluid>
        <Row>
            <Navbar className="shadow-sm bg-white">
                <Col xs={6} md={3} lg={2}>
                    <Navbar.Brand href="/izracun-kredita">
                        <Image 
                            src={finsterLight}
                            alt="Finster Logo"
                            fluid
                        />
                    </Navbar.Brand>
                </Col>
            </Navbar>
          </Row>
      </Container>
      
              
      <Container>  
        {/* DISPLAY FORM IF WE ARE NOT DISPLAYING RESULTS */}
        { !this.state.creditFormHidden ? (
          
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8}>

              <CreditFormStepper 
                creditType={this.state.formValues['creditType']}
                creditAmount={this.state.formValues['creditAmount']}
                creditTime={this.state.formValues['creditTime']}
                creditAffiliation={this.state.formValues['creditAffiliation']}
                creditInsurance={this.state.formValues['creditInsurance']}
                handleChange={this.handleChange} 
                handleFinishClick={this.handleFinishClick}
                availableBankSkills={availableBankSkills}
                activeBanks={this.state.formValues['activeBanks']}
                setCreditAmount={this.setCreditAmount}
                setCreditTime={this.setCreditTime}
                /> 
          </Col>
        </Row>
             
          
        ) : (

              <FormResults 
              backToStart={this.backToStart}
              activeBanks={this.state.formValues['activeBanks']}
              getUrl={this.getUrl}
              creditType={this.state.formValues['creditType']}
              creditAmount={this.state.formValues['creditAmount']}
              creditTime={this.state.formValues['creditTime']}
              creditAffiliation={this.state.formValues['creditAffiliation']}
              creditInsurance={this.state.formValues['creditInsurance']}
              handleChange={this.handleChange} 
              handleFinishClick={this.handleFinishClick}
              availableBankSkills={availableBankSkills}
              activeBanks={this.state.formValues['activeBanks']}
              />
        )}
      
      </Container>
      </div>
      
    );
  }
}

export default CalculatorPage;



