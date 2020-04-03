import React from 'react';
import Container from '@material-ui/core/Container';
import { Grid, FormControl, Box, Typography, Hidden } from '@material-ui/core';

// custom compnents
import CreditFormStepper from '../components/forms/CreditFormStepper';
import valueMapper from '../config/calcSetup.yml';
// import creditValueRangeMapper from '../config/creditValueRangeMapper';
import creditRangeMap from '../config/creditRangeMap.yml';
import FormResults from '../components/FormResults';

// images
import finsterDark from '../resources/img/finster-dark.svg';
// import finsterLight from '../resources/img/finster.svg';


class CalculatorPage extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      formValues: {
        'creditType': 'stanovanjski',
        'creditAmount': 10000,
        'creditTime': 5,
        'creditAffiliation': true,
        'activeBanks': [],
        'creditInsurance': 'insurance'
      },
      // TODO show form options depending on present bankSkills
      bankSkills: {
        'stanovanjski': ['sberbank', 'skb', 'sparkasse', 'unicredit', 'gorenjska'],
        'potrošniški': ['sberbank', 'skb', 'sparkasse', 'unicredit', 'gorenjska'],
        // TODO: FIX ŠTUDENTSKI KREDIT PRIKAZOVANJE
        'študentski': ['gorenjska'],
        'hitri': ['sberbank', 'sparkasse', 'unicredit'],
        'gotovinski': ['sberbank']
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
    this.getUrl = this.getUrl.bind(this)

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

  /** 
  * Build a url of a given bank with 
  * @param {String} bankName  Name of the bank
  * @return   url
  */
  getUrl(bankName){

    let creditAmount = this.state.formValues["creditAmount"];
    let creditType = this.state.formValues["creditType"];
    
    let creditInsurance = valueMapper[bankName]["creditInsurance"][this.state.formValues['creditInsurance']]; 
    
    // MULTIPLY YEARS WITH 12 TO GET MONTHS
    let creditTime = this.state.formValues["creditTime"]*12;  

    // TODO remove ŠUMNIKI FROM bankName for URL generation!!
    replaceChars = (txt) => {
      let replaceList={ "č":"c", "š":"s", "ž":"z" };
      txt.replace(/č|ž|š/g,function(match) {return replaceList[match];})
      return txt
    }
    let correctBankName = replaceChars(bankName);
    console.log("correct bank name ", correctBankName);
    let call_url = `${process.env.LAMBDA_HOST}/${correctBankName}/${creditType}` + `?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`
    
    return call_url
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

    // select and assign active banks to state when changing creditType
    if (event.target.name === 'creditType') {
      this.setActiveBanks(event.target.value);  
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
     
      <Container maxWidth="md">
        <Grid container>
            {/* Display logo */}
            <Grid item xs={12} sm={10} md={8}>
              <Box pt={"2em"}/>
                <a href="/"><img style={{"height": "2.5em"}} src={finsterDark}/></a>
              <Box pt={"0.5em"} />
            </Grid>
        </Grid>
        
        {/* DISPLAY FORM IF WE ARE NOT DISPLAYING RESULTS */}
        { !this.state.creditFormHidden ? (
          
            <Grid container justify="center">
              <Grid item xs={12} sm={10} md={8}>
                <CreditFormStepper 
                  creditType={this.state.formValues['creditType']}
                  creditAmount={this.state.formValues['creditAmount']}
                  creditTime={this.state.formValues['creditTime']}
                  creditAffiliation={this.state.formValues['creditAffiliation']}
                  creditInsurance={this.state.formValues['creditInsurance']}
                  handleChange={this.handleChange} 
                  creditValueRangeMapper={creditRangeMap} 
                  handleFinishClick={this.handleFinishClick}
                  availableBankSkills={availableBankSkills}
                  activeBanks={this.state.formValues['activeBanks']}
                  /> 
              </Grid>
            </Grid>
          
        ) : (
          
            <FormResults 
            backToStart={this.backToStart}
            activeBanks={this.state.formValues['activeBanks']}
            getUrl={this.getUrl}
             />

        )}
      
      </Container>
      
    );
  }
}

export default CalculatorPage;



