import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { 
    Nav, Navbar, Container, Row, Col, Image, Button, Form } 
  from 'react-bootstrap';


Array.min = function( array ){
    return Math.min.apply( Math, array );
};
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

class CreditAmount extends Component {
    componentDidMount() {
        // empty
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
    maxTime = Math.ceil(this.getLowestMaxValue('max_time', this.props.creditInsurance, this.props.creditType)/12)
    minTime = Math.floor(this.getHighestMinValue('min_time', this.props.creditInsurance, this.props.creditType)/12)

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

    valueLabelFormat(value) {
        let thousandFormat = value/1000;
        return `${thousandFormat}k`
      }

    render() {
        return(
            <div>
                <Row>
                    <Col>
                        <h5 className="pb-5">Izberite znesek kredita (v Evrih)</h5>
                    </Col>
                </Row>
                    
                <Row>
                    <Col className="px-5">
                        <Slider
                            value={this.props.creditAmount}
                            name="creditAmount"
                            aria-labelledby="discrete-slider-always"
                            step={1000}
                            min={this.minAmount}
                            marks={this.amountMarks}
                            max={this.maxAmount}
                            valueLabelDisplay="on"
                            valueLabelFormat={this.valueLabelFormat}
                            onChange={ (event, value) => this.props.handleChange(event, "creditAmount", value)}
                        />
                    </Col>
                </Row>

                
                {/* creditTime */}
                <Row>
                    <Col>
                        <h5 className="pb-5">Izberite dobo odplačila (v letih)</h5>
                    </Col>
                </Row>
                
                <Row>
                    <Col className="px-5">
                        <Slider
                            value={this.props.creditTime}
                            name="creditTime"
                            aria-label="custom thumb label"
                            step={1}
                            min={this.minTime}
                            max={this.maxTime}
                            marks={this.timeMarks}
                            valueLabelDisplay="on"
                            onChange={ (event, value) => this.props.handleChange(event, "creditTime", value)}
                        />
                    </Col> 
                </Row>
        </div>
        );
    }
}
      
export default CreditAmount;