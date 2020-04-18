import React, { useEffect } from 'react';
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

import {getMinValue, getMaxValue} from './utils';

Array.min = function( array ){
    return Math.min.apply( Math, array );
};
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

export default function CreditTime (props) {
    
    var creditTime = props.creditTime;

    var maxTime = Math.ceil(getMaxValue('max_time', props.creditInsurance, props.creditType, props.activeBanks)/12);
    var minTime = Math.floor(getMinValue('min_time', props.creditInsurance, props.creditType, props.activeBanks)/12);


    useEffect(() => {
        if (creditTime == null) {
             creditTime = minTime;
             props.setCreditTime(minTime);
        }
 
     }, []);

    var timeMarks = [
    {
        value: minTime,
        label: minTime,
    },
    {
        value: maxTime,
        label: maxTime,
    },
    ];

    return (     
        <div>

        { props.inputType == 'slider' ? (
        
        
            <Row className="px-3 py-3">
                <Col>
                    <Slider
                        value={creditTime}
                        name="creditTime"
                        aria-label="custom thumb label"
                        step={1}
                        min={minTime}
                        max={maxTime}
                        marks={timeMarks}
                        valueLabelDisplay="on"
                        onChange={ (event, value) => props.handleChange(event, "creditTime", value)} />
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
                        id="standard-adornment-years"
                        name="creditTime"
                        type="number"
                        value={creditTime}
                        onChange={props.handleChange}
                        endAdornment={<InputAdornment position="end">let</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                        'aria-label': 'leta',
                        }}
                    />
                    {/* <FormHelperText id="standard-weight-helper-text">Leta</FormHelperText> */}
                </FormControl>
            </Col>
            </Row>
        ) : 
        null
        }
        </div>           

    );
}
      
