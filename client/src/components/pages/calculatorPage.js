import React from 'react';
/*import CreditForm from './components/CreditForm';*/
import CreditFormStepper from '../forms/CreditFormStepper';
import OfferRow from '../OfferRow';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';

//import './index.css';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import valueMapper from '../../config/calcSetup';
import creditValueRangeMapper from '../../config/creditValueRangeMapper';

class CalculatorPage extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      formValues: {
        'creditType': 'stanovanjski',
        'creditAmount': 10000,
        'creditTime': 15,
        'creditAffiliation': true,
        'activeBanks': [],
        'creditInsurance': 'insurance'
      },
      // TODO show form options depending on present bankSkills
      bankSkills: {
        'stanovanjski': ['sberbank', 'skb'],
        'avtomobilski': ['sberbank'],
        'potrošniški': ['sberbank', 'skb'],
        'hitri': [],
        'gotovinski': ['sberbank']
      },
      offerResults: [],
      creditFormHidden: false
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
    let creditTime = this.state.formValues["creditTime"]    
    
    var urlMapper = {
      "sberbank": {
        "potrošniški": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/potrosniski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "stanovanjski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/stanovanjski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "avtomobilski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/avtomobilski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "gotovinski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/sberbank/gotovinski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`
      },
      "skb": {
        "stanovanjski": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/skb/stanovanjski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`,
        "potrošniški": `https://pcbu27f2x0.execute-api.eu-west-1.amazonaws.com/dev/skb/potrosniski?creditAmount=${creditAmount}&creditInsurance=${creditInsurance}&creditTime=${creditTime}`
      }  
    };

    return urlMapper[bankName][creditType]
  }

  

  fetchExample(bankName){
    
    let offerResults = this.state["offerResults"];

    var url = this.getUrl(bankName);
    console.log("url:", url);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
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
      console.log('Found active banks')
      let fetchResult = activeBanks.map((bank) => this.fetchExample(bank));

      console.log("Fetch result", fetchResult);



    } else {
      console.log('Active banks not found')

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

    console.log("event object: "+event)
    console.log("event target: "+event.target)

    console.log("event target name: "+event.target.name);
    console.log("event target value: "+event.target.value);
    console.log("event elem: "+elem);

    console.log("value: "+value);

   

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

  render() {

    var availableBankSkills = this.getAvailableBankSkills();


    var offerList = this.state["offerResults"];
    console.log(offerList)
    var offerItems = offerList.map(function(e, i){
      console.log(e)
      return <OfferRow key={i}  
              bankName={e["bankName"] }  
              monthlyAnnuity={e["data"]["monthlyAnnuity"] }  
              annualInterestRate={e["data"]["annualInterestRate"] }  
              totalLoanCost={e["data"]["totalLoanCost"] }  
              effectiveInterestRate={e["data"]["effectiveInterestRate"] }  
              totalAmountPaid={e["data"]["totalAmountPaid"]}
              />
    });

    return (
      <Container maxWidth="xl">
        <Grid container 
        spacing={0}
        justify='center'
        alignItems='center'
        >
          
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
          
          
          { offerItems.length > 0 ?  
            <div>
              <Grid item xs={12} sm={12}>
              <Button onClick={this.backToStart} 
                variant="contained"
                color="primary">
                      Nazaj na izračun
                </Button> 
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box mt="1.5rem">
                <Box component="span" mr={1}> <Chip variant="outlined" color="primary" size="small" 
                label={ 'Vrsta: ' + this.state.formValues['creditType']} /> </Box>
                 <Box component="span" mr={1}> <Chip variant="outlined" color="primary" size="small" 
                label={ 'Znesek: ' + this.state.formValues['creditAmount'] + ' €'} /></Box>
                 <Box component="span" mr={1}> <Chip variant="outlined" color="primary" size="small" 
                label={ 'Čas: ' + this.state.formValues['creditTime'] + 'mes.'}/></Box>
                <Chip variant="outlined" color="primary" size="small" 
                label={ 'Zavarovanje: ' + this.state.formValues['creditInsurance']}/>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
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


