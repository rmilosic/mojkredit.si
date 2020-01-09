import React, { Component } from 'react';
/*import FormHelperText from '@material-ui/core/FormHelperText';*/
import FormControl from '@material-ui/core/FormControl';
/*import FormLabel from '@material-ui/core/FormLabel';*/
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


import HorizontalLinearStepper from './CreditFormStepper'


class CreditForm extends Component {

  render() {
    return (
      <Grid container>
        
        <FormControl component="fieldset"  
            fullWidth={true}>
              
             
          <CreditType creditType={this.props.creditType} handleChange={this.props.handleChange} />

          <CreditAmount creditAmount={this.props.creditAmount} handleChange={this.props.handleChange} />

          <CreditAffiliation creditAffiliation={this.props.creditAffiliation} handleChange={this.props.handleChange} />
          <CreditInsurance creditInsurance={this.props.creditInsurance} handleChange={this.props.handleChange} />
          
        
          <Button variant="contained" color="primary" onClick={this.props.gatherCalculations}>Izračunaj</Button>
          
      </FormControl>
      </Grid>

    )}
}
      
      
export default CreditForm;
