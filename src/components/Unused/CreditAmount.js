import React, {useEffect} from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { 
    Row, Col } 
  from 'react-bootstrap';


import {getMinValue, getMaxValue} from '../Calculator/utils';


Array.min = function( array ){
    return Math.min.apply( Math, array );
};
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

export default function CreditAmount(props) {


    var creditAmount = props.creditAmount;
    
    var maxAmount = getMaxValue('max_amount', props.creditInsurance, props.creditType, props.activeBanks)
    var minAmount = getMinValue('min_amount', props.creditInsurance, props.creditType, props.activeBanks)

    useEffect(() => {

       if (creditAmount == null) {
            creditAmount = minAmount;
            props.setCreditAmount(minAmount);
       }

    }, []);

    
    var amountMarks = [
        {
          value: minAmount,
          label: minAmount,
        },
        {
          value: maxAmount,
          label: maxAmount,
        },
      ];


    function valueLabelFormat(value) {
        let thousandFormat = value/1000;
        return `${thousandFormat}k`
    }

    return (
        <div>
        { props.inputType == 'slider' ? (
         
            <Row className="px-3 py-3">
                <Col>
                    <Slider
                        value={creditAmount}
                        name="creditAmount"
                        aria-labelledby="discrete-slider-always"
                        step={1000}
                        min={minAmount}
                        marks={amountMarks}
                        max={maxAmount}
                        valueLabelDisplay="on"
                        valueLabelFormat={valueLabelFormat}
                        onChange={ (event, value) => props.handleChange(event, "creditAmount", value)}
                    />
                </Col>
            </Row>
            ) : null
        }

        {  props.inputType == 'field' ? (
            <Row>
            <Col>
                <FormControl>

                    {/* TODO: input validation */}
                    <Input
                        id="standard-adornment-weight"
                        value={creditAmount}
                        name="creditAmount"
                        type="number"
                        onChange={props.handleChange}
                        endAdornment={<InputAdornment position="end">Eur</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                        'aria-label': 'eur',
                        }}
                    />
                </FormControl>
            </Col>
        </Row>
        ) : 
            null
        }
        </div>
    );
};
      
