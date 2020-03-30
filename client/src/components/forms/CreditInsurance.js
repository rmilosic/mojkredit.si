import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';


import { Grid } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CreditInsurance extends Component {

    render() {
        return(
            <Grid container>
            {/* <Grid item xs={12} spacing={5}>
            <h1>Izberite način zavarovanja kredita</h1>
            </Grid> */}

            <Grid item xs={12}>
            <RadioGroup aria-label="creditInsurance" name="creditInsurance" value={this.props.creditInsurance} onChange={this.props.handleChange}>
                <FormControlLabel value="insurance" control={<Radio />} label="Zavarovalna premija" />
                <FormControlLabel value="mortgage" control={<Radio />} label="Nepremičnina" />
                {/*<FormControlLabel value="person" control={<Radio />} label="S poroki" />*/}

            </RadioGroup>
            </Grid>
            </Grid>
        );
    }
}
      
export default CreditInsurance;