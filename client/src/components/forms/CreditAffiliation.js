import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';


import { Grid } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CreditAffiliation extends Component {

    render() {
        return(
            <Grid container>
            <Grid item xs={12} spacing={5}>
            <h1>Želite pri ponudniku kredita odpreti račun?</h1>
            </Grid>

            <Grid item xs={12}>
            <RadioGroup aria-label="creditAffiliation" name="creditAffiliation" value={this.props.creditAffiliation} onChange={this.props.handleChange}>
                <FormControlLabel value="true" control={<Radio />} label="Da" />
                <FormControlLabel value="false" control={<Radio />} label="Ne" />
            </RadioGroup>
            </Grid>
            </Grid>
        );
    }
}
      
export default CreditAffiliation;