import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';



class CreditAmount extends Component {


    render() {
        return(
            <Grid container>
                <Grid item xs={12}>
                    <h1>Izberite znesek kredita</h1>
                </Grid>
            
                <Grid item xs={12}>
                    <Slider
                        value={this.props.creditAmount}
                        name="creditAmount"
                        aria-labelledby="input-slider"
                        step={1000}
                        min={1000}
                        max={200000}
                        onChange={ (event, value) => this.props.handleChange(event, "creditAmount", value)}
                    />        
                </Grid>

                <Grid item xs={12}>
                    <Input
                        name="creditAmount"
                        value={this.props.creditAmount}
                        margin='none'
                        inputProps={{
                            step: 1000,
                            min: 1000,
                            max: 200000,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                        fullwidth={true}
                        onChange={this.props.handleChange.bind(this)}
                        />
                
                </Grid>
            </Grid>
        );
    }
}
      
export default CreditAmount;