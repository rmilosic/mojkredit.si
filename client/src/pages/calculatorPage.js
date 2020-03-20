import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Grid, FormControl, Box, Typography, Hidden } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CreditFormStepper from '../components/forms/CreditFormStepper';
import OfferRowPanel from '../components/OfferRowPanel';
import valueMapper from '../config/calcSetup';
import creditValueRangeMapper from '../config/creditValueRangeMapper';

// images
import finsterDark from '../resources/img/finster-dark.svg';
// import finsterLight from '../resources/img/finster.svg';


// custom config
import urlConfigYaml from '../config/urlMapper.yml';

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
        'stanovanjski': ['sberbank', 'skb', 'sparkasse', 'unicredit'],
        'potrošniški': ['sberbank', 'skb', 'sparkasse', 'unicredit'],
        'hitri': ['sberbank', 'sparkasse', 'unicredit'],
        'gotovinski': ['sberbank']
      },
      offerResults: [],
      creditFormHidden: false,
      compareFixedInterestRate: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.gatherCalculations = this.gatherCalculations.bind(this)
    this.handleFinishClick = this.handleFinishClick.bind(this)
    this.showForm = this.showForm.bind(this)
    this.handleFinishClick = this.handleFinishClick.bind(this)
    this.backToStart = this.backToStart.bind(this)

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
    this.gatherCalculations();
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
    
    return urlConfigYaml[bankName][creditType] + `?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`
  }

  /** 
  * fetch calculator response for a given bank
  * @param {String} bankName bank name
  * @return {Promise} 
  */
  fetchResponse(bankName){
    
    let offerResults = this.state["offerResults"];

    var url = this.getUrl(bankName);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          // TODO: call function to render row with data and logo
          var pushData = {}
          pushData["data"] = json['data'];
          pushData["bankName"] = bankName;


          offerResults.push(pushData)
          this.setState({offerResults})

        });
      }
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  
  /** 
  * Gather calculations for all active banks
  */
  gatherCalculations(){
    console.log('Triggered gatherCalculations');

    if (this.state.formValues['activeBanks']){
      let activeBanks = this.state.formValues['activeBanks']
      let fetchResult = activeBanks.map((bank) => this.fetchResponse(bank));
    } 
  
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
      /*var ActiveBanks = bankSkills[event.target.value];
      console.log('Active banks', ActiveBanks)
      formValues['activeBanks'] = ActiveBanks;*/
      this.setActiveBanks(event.target.value);
  
    }

    if (event.target.name) {
      newValue = event.target.value;
      name = event.target.name;
    } else {
      newValue = value; // Field value
      name = elem
    }

    // console.log("\nName: "+name);
    // console.log("New value: "+newValue);

    formValues[name] = newValue;
    
    this.setState({formValues, bankSkills})
  }

  /**
   * Handle change in interest rate type comparison
   */
  handleComparisonChange = () => {
    let comparisonState = this.state['compareFixedInterestRate'];
    let newComparisonState = comparisonState ? false : true;

    this.setState({compareFixedInterestRate: newComparisonState})
  }


  render() {

    // get available bank sills
    var availableBankSkills = this.getAvailableBankSkills();

    // get offer result list
    var offerList = this.state["offerResults"];
    
    // set type of interest rate
    var omType = this.state['compareFixedInterestRate'] ? "fixed" : "variable";

    // filter offer items for given type of interest rate
    var offerItems = offerList.filter(function(e, i){
      // console.log(e)
      // console.log("omtype", e[omType]);
      
      // retrieve the right data in relation to interest rate type
      if(e["data"][omType] != null){
        return true;
      }
        return false;
      })
      .map(function (e, i){
        console.log("omtype", e[omType]);
        return <OfferRowPanel key={i}  
              bankName={e["bankName"] }  
              monthlyAnnuity={e["data"][omType]["monthlyAnnuity"] }  
              annualInterestRate={e["data"][omType]["annualInterestRate"] }  
              totalLoanCost={e["data"][omType]["totalLoanCost"] }  
              effectiveInterestRate={e["data"][omType]["effectiveInterestRate"] }  
              totalAmountPaid={e["data"][omType]["totalAmountPaid"]}
              />
      });

    return (
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
                  gatherCalculations={this.gatherCalculations}
                  handleChange={this.handleChange} 
                  creditValueRangeMapper={creditValueRangeMapper} 
                  handleFinishClick={this.handleFinishClick}
                  availableBankSkills={availableBankSkills}
                  activeBanks={this.state.formValues['activeBanks']}
                  /> 
              </Grid>
            </Grid>
          
        ) : (
            <div>

                {/* BACK AND CHANGE OM TYPE */}
                {/* <Grid container>
                  
                  <Grid item xs={12} sm={10} md={8}> */}
                    {/* <Button onClick={this.backToStart} 
                      variant="contained"
                      color="primary">
                            Nazaj na izračun
                    </Button>  */}
                  {/* </Grid>
                  <Grid item xs={12} sm={10} md={8}>
                    <FormControl required={true}>
                      <RadioGroup aria-label="interestRateType" row 
                        name="interestRateType" 
                        value={this.state['compareFixedInterestRate'] ? "fiksnaOM" : "spremenljivaOM"}  
                        onChange={this.handleComparisonChange}>
                          
                          
                        <FormControlLabel value={"fiksnaOM"} control={<Radio />} label={"Fiksna OM"} />
                        <FormControlLabel value={"spremenljivaOM"} control={<Radio />} label={"Variabilna OM"} />

                      </RadioGroup>
                    </FormControl>
                  </Grid> */}
                            
              
                {/* </Grid> */}
                
                {/* TOGGLE BUTTON FOR INTEREST RATE COMPARISON  */}
                <Grid container spacing={2} justify="center">

                  <Grid item xs={12} md={3}>
                    <Grid item xs={12} md={12}>
                      <Hidden smDown>
                      <Box pt={"4em"}/>
                      </Hidden>
                      <Button onClick={this.backToStart} 
                          variant="outlined"
                          color="secondary"
                          fullWidth={true}>
                                Nazaj na izračun
                      </Button>
                    </Grid>
                   
                    <Grid item xs={12} md={12}>
                      <Box pt={"1em"}/>
                      
                      <FormControl required={true}>
                        {/* XS SM ROW */}
                        <Hidden mdUp>
                          <Typography variant="caption"><strong>Tip obrestne mere</strong></Typography>
                          <RadioGroup aria-label="interestRateType"  
                            name="interestRateType" 
                            value={this.state['compareFixedInterestRate'] ? "fiksnaOM" : "spremenljivaOM"}  
                            onChange={this.handleComparisonChange}
                            row>
                              
                            
                            <FormControlLabel value={"fiksnaOM"} control={<Radio />} label={"Fiksna"} />
                            <FormControlLabel value={"spremenljivaOM"} control={<Radio />} label={"Variabilna"} />

                          </RadioGroup>
                        </Hidden>
                        
                        {/* SM UP */}
                        <Hidden smDown>
                          <RadioGroup aria-label="interestRateType"  
                            name="interestRateType" 
                            value={this.state['compareFixedInterestRate'] ? "fiksnaOM" : "spremenljivaOM"}  
                            onChange={this.handleComparisonChange}>
                              
                            <span><strong>Tip obrestne mere</strong></span>
                            <FormControlLabel value={"fiksnaOM"} control={<Radio />} label={"Fiksna"} />
                            <FormControlLabel value={"spremenljivaOM"} control={<Radio />} label={"Variabilna"} />

                          </RadioGroup>
                        </Hidden>
                        
                      </FormControl>
                    </Grid>
                  </Grid>
              
                  <Grid item xs={12} sm={10} md={9}>
                    {/* DISPLAY OFFER ITEMS */}
                    
                    { (offerItems.length) > 0 ? 
                    <div>{offerItems}</div> 
                    : <Typography variant="h3">No results found for your search</Typography>
                    }
                  </Grid> 
              </Grid>
            </div>
        )}

      </Container>

    );
  }
}

export default CalculatorPage;



