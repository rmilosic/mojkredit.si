import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

Array.min = function( array ){
    return Math.min.apply( Math, array );
};
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

class CreditAmount extends Component {
    componentDidMount() {
        console.log(this.props.creditValueRangeMapper);
    }

    getCandidateValues(finalValue, creditInsurance, creditType){
        var activeBanks = this.props.activeBanks
        var candidateValues = []
        // iterate banks
        Object.entries(this.props.creditValueRangeMapper).forEach(([bank, creditTypeDict]) => {
            if (activeBanks.includes(bank)) {
                console.log(`activeBanks includes ${bank}`)
                Object.entries(creditTypeDict).forEach(([availableCreditType, insuranceTypeDict]) => {
                    
                    if (availableCreditType === creditType){

                        // select target value and append to final list
                        // iterate insurance types

                        Object.entries(insuranceTypeDict['creditInsurance']).forEach(([availableInsuranceType, valueMap]) => {
                            // console.log(`Insurance type ${insuranceType}`)
                            // console.log(`Insurance type ${creditInsurance}`)
                            if (availableInsuranceType === creditInsurance){
                                // select target value and append to final list
                                console.log(valueMap)
                                var targetValue = valueMap[finalValue]
                                console.log(`Target value ${targetValue}`)
                                candidateValues.push(targetValue)
                            }
                        })
                    }
                }) 
            } else {
                // console.log(`activeBanks doesnt include ${bank}`)
            }
        });
        return candidateValues
    }

    getHighestMinValue(finalValue, creditInsurance, creditType){
         // const keys = Object.keys(driversCounter);
         var candidateValues = this.getCandidateValues(finalValue, creditInsurance, creditType)
         var highestMinValue = Array.max(candidateValues)
         return highestMinValue
    }
   
    getLowestMaxValue(finalValue, creditInsurance, creditType){
        // const keys = Object.keys(driversCounter);
        var candidateValues = this.getCandidateValues(finalValue, creditInsurance, creditType)       
        var lowestMaxValue = Array.min(candidateValues)
        console.log(`getLowestMaxValue triggered with ${arguments}`)
        console.log(`candidateValues ${candidateValues}`)
        console.log(`lowestMaxValue ${lowestMaxValue}`)
        return lowestMaxValue
    }

    maxAmount = this.getLowestMaxValue('max_amount', this.props.creditInsurance, this.props.creditType)
    minAmount = this.getHighestMinValue('min_amount', this.props.creditInsurance, this.props.creditType)
    maxTime = this.getLowestMaxValue('max_time', this.props.creditInsurance, this.props.creditType)/12
    minTime = this.getHighestMinValue('min_time', this.props.creditInsurance, this.props.creditType)/12

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
                        step={1000}
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
                    <h2>Izberite dobo odplačila (v letih)</h2>
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