import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';


import { Grid, FormControl } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CreditType extends Component {

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    render() {
        return(
            
            <div>
            {/* <Grid item xs={12} >
            <h1>Izberite vrsto kredita</h1>
            </Grid> */}

            <Grid item xs={12}>
            
            <FormControl required={true}>
            <RadioGroup aria-label="creditType" name="creditType" value={this.props.creditType} onChange={this.props.handleChange}>
                
                { this.props.availableBankSkills.map((skill) => {
                    return <FormControlLabel value={skill} control={<Radio />} label={this.toTitleCase(skill)} />

                })}
                
            
            </RadioGroup>
            </FormControl>
            </Grid>

            </div>
        );
    }
}
      
export default CreditType;