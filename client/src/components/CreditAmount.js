import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';



class CreditAmount extends Component {
    componentDidMount() {
        console.log(this.props.valueMapper['sberbank']);
    }
   
    getMaxValue(){
        
    }
    minAmount = this.props.valueMapper['sberbank']['creditAmountRange'][this.props.creditType]['creditInsurance'][this.props.creditInsurance]['min_amount'];
    maxAmount = this.props.valueMapper['sberbank']['creditAmountRange'][this.props.creditType]['creditInsurance'][this.props.creditInsurance]['max_amount'];
    minTime = this.props.valueMapper['sberbank']['creditAmountRange'][this.props.creditType]['creditInsurance'][this.props.creditInsurance]['min_time'];
    maxTime = this.props.valueMapper['sberbank']['creditAmountRange'][this.props.creditType]['creditInsurance'][this.props.creditInsurance]['max_time'];

    amountMarks = [
        {
          value: this.minAmount,
          label: this.minAmount,
        },
        {
          value: this.maxAmount,
          label: this.maxAmount,
        },
      ];

      timeMarks = [
        {
          value: this.minTime,
          label: this.minTime,
        },
        {
          value: this.maxTime,
          label: this.maxTime,
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
                        min={this.minAmount}
                        marks={this.amountMarks}
                        max={this.maxAmount}
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
                            min: this.minAmount,
                            max: this.maxAmount,
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
                        min={this.minTime}
                        max={this.maxTime}
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
                            min: this.minTime,
                            max: this.maxTime,
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