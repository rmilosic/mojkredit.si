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
        'creditLength': 24,
        'creditAmount': 5000,
        'creditAffiliation': true,
        'activeBanks': []
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

  /*calculate(bank){
    console.log('credit type', this.state.formValues['creditType'])
    console.log('calculating bank', bank)
  }*/

  gatherCalculations(){
    console.log('Triggered gatherCalculations')

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
            {/*<CreditForm 
            creditType={this.state.formValues['creditType']}
            creditTime={this.state.formValues['creditLength']}
            creditAmount={this.state.formValues['creditAmount']}
            creditAffiliation={this.state.formValues['creditAffiliation']}
            creditInsurance={this.state.formValues['creditInsurance']}
            gatherCalculations={this.gatherCalculations}
            handleChange={this.handleChange}/>*/}
            <CreditFormStepper 
              creditType={this.state.formValues['creditType']}
              creditTime={this.state.formValues['creditLength']}
              creditAmount={this.state.formValues['creditAmount']}
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


