import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';


import { Grid } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CreditType extends Component {

    render() {
        return(
            <Grid container>
            <Grid item xs={12} spacing={5}>
            <h1>Izberite vrsto kredita</h1>
            </Grid>

            <Grid item xs={12}>
            <RadioGroup aria-label="creditType" name="creditType" value={this.props.creditType} onChange={this.props.handleChange}>
                <FormControlLabel value="mortgage" control={<Radio />} label="Stanovanjski" />
                {/*<FormControlLabel value="student" control={<Radio />} label="Študentski" />*/}
                <FormControlLabel value="quick" control={<Radio />} label="Hitri" />
                <FormControlLabel value="cash" control={<Radio />} label="Gotovinski" />
                <FormControlLabel value="car" control={<Radio />} label="Avtomobilski" />


            
            </RadioGroup>
            </Grid>
            </Grid>
        );
    }
}
      
export default CreditType;