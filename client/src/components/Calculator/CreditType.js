import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';


import { Grid, FormControl } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CreditType extends Component {

    toTitleCase(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }

    render() {
        return(
            
            <div>
            
            
            <FormControl required={true}>
            <RadioGroup aria-label="creditType" name="creditType" value={this.props.creditType} onChange={this.props.handleChange}>
                
                { this.props.availableBankSkills.map((skill) => {
                    return <FormControlLabel value={skill} control={<Radio />} label={this.toTitleCase(skill)} />

                })}
                
            
            </RadioGroup>
            </FormControl>

            </div>
        );
    }
}
      
export default CreditType;