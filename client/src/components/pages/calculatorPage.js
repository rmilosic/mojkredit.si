import React from 'react';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import CreditFormStepper from '../forms/CreditFormStepper';
import OfferRowPanel from '../OfferRowPanel';
import valueMapper from '../../config/calcSetup';
import creditValueRangeMapper from '../../config/creditValueRangeMapper';


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
        'stanovanjski': ['sberbank', 'skb', 'sparkasse'],
        'avtomobilski': ['sberbank'],
        'potrošniški': ['sberbank', 'skb', 'sparkasse'],
        'hitri': ['sberbank', 'sparkasse'],
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
  }

  setActiveBanks(creditType){
    let newFormValues = this.state.formValues;
    let activeBanks = this.state.bankSkills[creditType]
    newFormValues['activeBanks'] = activeBanks;
    this.setState({formValues: newFormValues});
  }

  getAvailableBankSkills(){
    let skillsList = []
    for (const [key, value] of Object.entries(this.state.bankSkills)) {
      if (value.length) {
        skillsList.push(key);
      }
    }
    return skillsList;
  }
  
  handleFinishClick() {
    this.toggleFormVisibility();
    this.gatherCalculations();
  }

  showForm(){
    this.setState({ creditFormHidden: false });
  }

  toggleFormVisibility(){
    let formState = this.state.creditFormHidden;
    let newFormState = ( formState ? false : true )
    this.setState({ creditFormHidden: newFormState });
  }

  getUrl(bankName){

    let creditAmount = this.state.formValues["creditAmount"];
    let creditType = this.state.formValues["creditType"];
    let creditInsurance = valueMapper[bankName]["creditInsurance"][this.state.formValues['creditInsurance']]; 
    // MULTIPLY YEARS WITH 12 TO GET MONTHS
    let creditTime = this.state.formValues["creditTime"]*12;    
    
    var urlMapper = {
      "sberbank": {
        "potrošniški": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/potrosniski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "stanovanjski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/stanovanjski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "avtomobilski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/avtomobilski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "gotovinski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/gotovinski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "hitri": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/hitri?creditAmount=${creditAmount}&creditTime=${creditTime}`
      },
      "skb": {
        "stanovanjski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/skb/stanovanjski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "potrošniški": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/skb/potrosniski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`
      },
      "sparkasse": {
        "stanovanjski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sparkasse/stanovanjski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "potrošniški": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sparkasse/potrosniski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "hitri": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sparkasse/hitri?creditAmount=${creditAmount}&creditTime=${creditTime}`
      }
    };

    return urlMapper[bankName][creditType]
  }

  

  fetchExample(bankName){
    
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
  
  
  gatherCalculations(){
    console.log('Triggered gatherCalculations');

    if (this.state.formValues['activeBanks']){
      let activeBanks = this.state.formValues['activeBanks']
      let fetchResult = activeBanks.map((bank) => this.fetchExample(bank));
    } 
  
  }

  backToStart(){
    this.setState({offerResults: []});
    this.toggleFormVisibility();
  }
  
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


    console.log("\nName: "+name);
    console.log("New value: "+newValue);

    formValues[name] = newValue;
    
    this.setState({formValues, bankSkills})
  }

  handleComparisonChange = () => {
    let comparisonState = this.state['compareFixedInterestRate'];
    let newComparisonState = comparisonState ? false : true;

    this.setState({compareFixedInterestRate: newComparisonState})
  }


  render() {

    var availableBankSkills = this.getAvailableBankSkills();

    var offerList = this.state["offerResults"];
    console.log(offerList)
    
    var omType = this.state['compareFixedInterestRate'] ? "fixed" : "variable";

    var offerItems = offerList.map(function(e, i){
      console.log(e)

      // retrieve the right data in relation to interest rate type
      

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
        <Grid container 
        justify='center'
        alignItems='center'
        >
          

          {/* DISPLAY FORM IF WE ARE NOT DISPLAYING RESULTS */}
          { !this.state.creditFormHidden &&
            
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
           
          }
          
          {/* CHECK IF WE HAVE ANY OFFER RESULTS */}
          { offerItems.length > 0 ?  
            <div>
              {/* DISPLAY SELECTED FORM VALUES */}
              <Grid item xs={12} sm={12}>
              <Button onClick={this.backToStart} 
                variant="contained"
                color="primary">
                      Nazaj na izračun
                </Button> 
              </Grid>
              <Grid container>
                <Grid item xs={7}>
                  <Box mt="1.5rem">
                  <Box component="span" mr={1}> <Chip variant="outlined" color="primary" size="small" 
                  label={ 'Vrsta: ' + this.state.formValues['creditType']} /> </Box>
                  <Box component="span" mr={1}> <Chip variant="outlined" color="primary" size="small" 
                  label={ 'Znesek: ' + this.state.formValues['creditAmount'] + ' €'} /></Box>
                  <Box component="span" mr={1}> <Chip variant="outlined" color="primary" size="small" 
                  label={ 'Čas: ' + this.state.formValues['creditTime'] + ' let'}/></Box>
                  <Chip variant="outlined" color="primary" size="small" 
                  label={ 'Zavarovanje: ' + this.state.formValues['creditInsurance']}/>
                  </Box>
                </Grid>
                
                {/* TOGGLE BUTTON FOR INTEREST RATE COMPARISON */}
                <Grid item xs={5}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch checked={this.state['compareFixedInterestRate']} 
                        value={this.state['compareFixedInterestRate'] ? "fiksnaOM" : "spremenljivaOM"} 
                        onChange={this.handleComparisonChange} />
                      }
                      label={this.state['compareFixedInterestRate'] ? "Fiksna OM" : "Spremenljiva OM"}
                    />
                  </FormGroup>
                </Grid>

              </Grid>
              
              <Grid item xs={12} sm={12}>
                  {/* DISPLAY OFFER ITEMS */}
                  <div>{offerItems}</div>
              </Grid> 
              </div>
          : null
        }

        </Grid>
      </Container>
    )

  }

}

export default CalculatorPage;



