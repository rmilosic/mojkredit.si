import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';



class CreditAmount extends Component {

    amountMarks = [
        {
          value: 1000,
          label: '1000',
        },
        {
          value: 200000,
          label: '200 000',
        },
      ];

      timeMarks = [
        {
          value: 12,
          label: '12',
        },
        {
          value: 240,
          label: '240',
        },
      ];

    render() {
        return(
            <Grid container>
                <Grid item xs={12}>
                    <h2>Izberite znesek kredita (v Evrih)</h2>
                </Grid>
            
                <Grid item xs={12} sm={12} md={8}>
                    <Box pl="2rem" pr="2rem">                    
                    <Slider
                        value={this.props.creditAmount}
                        name="creditAmount"
                        aria-labelledby="input-slider"
                        step={100}
                        min={1000}
                        marks={this.amountMarks}
                        max={200000}
                        onChange={ (event, value) => this.props.handleChange(event, "creditAmount", value)}
                    />
                    </Box>        
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
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

                
                
                {/* creditTime */}
                <Grid item xs={12}>
                    <Box mt="3rem"/>
                    <h2>Izberite dobo odplačila (v mesecih)</h2>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Box pl="2rem" pr="2rem">               
                    <Slider
                        value={this.props.creditTime}
                        name="creditTime"
                        aria-labelledby="input-slider"
                        step={1}
                        min={12}
                        max={240}
                        marks={this.timeMarks}
                        onChange={ (event, value) => this.props.handleChange(event, "creditTime", value)}
                    /> 
                    </Box>       
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                    <Input
                        name="creditTime"
                        value={this.props.creditTime}
                        margin='none'
                        inputProps={{
                            step: 1,
                            min: 12,
                            max: 240,
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