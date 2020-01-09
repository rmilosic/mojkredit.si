import React from 'react';
import ReactDOM from 'react-dom';
/*import CreditForm from './components/CreditForm';*/
import CreditFormStepper from './components/CreditFormStepper';
import Container from '@material-ui/core/Container';


import './index.css';
import { Grid } from '@material-ui/core';


class App extends React.Component {
  
  
  constructor(props) {
    super(props)

    this.state = {
      formValues: {
        'creditType': 'mortgage',
        'creditAmount': 5000,
        'creditTime': 120,
        'creditAffiliation': true,
        'activeBanks': [],
        'creditInsurance': 'mortgage'
      },
      bankSkills: {
        'mortgage': ['sberbank'],
        'car': ['sberbank'],
        'cash': ['sberbank', 'addiko'],
        'quick': ['sberbank']
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.gatherCalculations = this.gatherCalculations.bind(this)
  }

  fetchExample(){
    return fetch('https://www.sberbank.si/scredits/?command=calculate', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Content-Length': 170,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Sec-Fetch-Site': 'same-origin',
        'Origin': 'https://www.sberbank.si',
        'Sec-Fetch-Mode': 'cors',
        'Referer': 'https://www.sberbank.si/izracun-stanovanjski-kredit',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Host': 'www.sberbank.si'
      },
      body: JSON.stringify({
        'id': 17,
        'namenKredita': 2,
        'oblikaSodelovanja': 1,
        'valuta': 1,
        'vrstaOM': 1,
        'znesekKredita': 1000,
        'odplacilnaDoba': 68,
        'zadnjaMesecnaAnuiteta': 0,
        'format': 'html',
        'nacinZavarovanja': 1
      }),
    })
    .then(response => console.log(response))
    .catch((error) =>{
      console.error(error);
    });
  }
  
  
  gatherCalculations(){
    console.log('Triggered gatherCalculations');

    this.fetchExample();

    if (this.state.formValues['activeBanks']){
      let activeBanks = this.state.formValues['activeBanks']
      console.log('Found active banks')
      activeBanks.map((bank) => console.log('Scraping bank', bank))


    } else {
      console.log('Active banks not found')

    }
  
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
      var ActiveBanks = bankSkills[event.target.value];
      console.log('Active banks', ActiveBanks)
      formValues['activeBanks'] = ActiveBanks;
      

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
    return (
      <Container maxWidth="xl">
        <Grid container 
        spacing={0}
        justify='center'
        alignItems='center'
        >
          
          <Grid item xs={12} sm={10} md={8} lg={8}>
            <CreditFormStepper 
              creditType={this.state.formValues['creditType']}
              creditAmount={this.state.formValues['creditAmount']}
              creditTime={this.state.formValues['creditTime']}
              creditAffiliation={this.state.formValues['creditAffiliation']}
              creditInsurance={this.state.formValues['creditInsurance']}
              gatherCalculations={this.gatherCalculations}
              handleChange={this.handleChange} />

          </Grid>
          
        </Grid>
      </Container>
    )

  }

}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


