import React from 'react';

import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Input, InputAdornment, FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';


import { 
  Row, Col
} 
from 'react-bootstrap';


import { getConsolidatedValues } from './utils'

// import CreditType from './CreditType';
// import CreditAmount from './CreditAmount';
// import CreditTime from './CreditTime';
// import CreditInsurance from './CreditInsurance';
// import { Card, CardContent } from '@material-ui/core';



export default function FormBasic(props) {
  // state
  const [validPurpose, setValidPurpose] = React.useState(false);
  const [validAmount, setValidAmount] = React.useState(false);
  const [validTime, setValidTime] = React.useState(false);

  const [minAmount,  setMinAmount] = React.useState(null);
  const [maxAmount,  setMaxAmount] = React.useState(null);
  const [minTime,  setMinTime] = React.useState(null);
  const [maxTime,  setMaxTime] = React.useState(null);

  const [amountValMessage, setAmountValMessage] = React.useState('');
  const [timeValMessage, setTimeValMessage] = React.useState('');
  const [totalValMessage, setTotalValMessage] = React.useState(null);


  /**
   * Handle credit purpose change
   */
  const handleCreditPurposeChange = (event) => {
    event.preventDefault();

    // set changed credit type
    props.setCreditType(event.target.value);
    // set state to valid
    props.setCreditAmount(null);
    props.setCreditTime(null);
    !validPurpose ? setValidPurpose(true) : null;

  };

  /**
   * Handle credit amount change
   */
  const handleCreditAmountChange = (event) => {
    event.preventDefault();

    var value = event.target.value;

    // let value = event.target.value;
    console.log("amount: ", event.target.value)
    console.log("credit Type", props.creditType);
    console.log("active banks", props.activeBanks);

    setValidAmount(false);
    props.setCreditAmount(null);

    if (props.creditType != null && props.activeBanks != null){
      setAmountValMessage(``)
      let maxAmount = getConsolidatedValues("max", "max_amount", props.creditType, props.activeBanks);
      let minAmount = getConsolidatedValues("min", "min_amount", props.creditType, props.activeBanks);
  
      setMinAmount(minAmount);
      setMaxAmount(maxAmount);
      
      if (value == '') {
        setAmountValMessage("Vnesite znesek kredita");
      } else if (value < minAmount) {
        console.log("num is:", value)
        setAmountValMessage(`Najnižji možni znesek za izbrano vrsto kredita je ${minAmount} EUR `)
      } else if (value > maxAmount) {
        setAmountValMessage(`Najvišji možni znesek za izbrano vrsto kredita je ${maxAmount} EUR `)
      } else {
        setAmountValMessage(``);
        setValidAmount(true);
        props.setCreditAmount(parseInt(value));
      }

    } else {
      setAmountValMessage(`Najprej izberite vrsto kredita `)
    }

  };

  const handleCreditTimeChange = (event) => {
    event.preventDefault();

    setValidTime(false);
    props.setCreditTime(null);

    var value = event.target.value;

    if (props.creditType != null && props.activeBanks != null){
      setTimeValMessage(``);

      let minTime = getConsolidatedValues("min", "min_time", props.creditType, props.activeBanks);
      let maxTime = getConsolidatedValues("max", "max_time", props.creditType, props.activeBanks);
  
        setMinTime(minTime);
        setMaxTime(maxTime);
      
      if (value == '') {
        setTimeValMessage("Vnesite znesek kredita");
      } else if (value < minTime) {
        console.log("time is:", value)
        setTimeValMessage(`Najnižji možni čas odplačila za izbrano vrsto kredita je ${minTime} mesecev `)
      } else if (value > maxTime) {
        setTimeValMessage(`Najvišji možni čas odplačila  za izbrano vrsto kredita je ${maxTime} mesecev `)
      } else {
        setTimeValMessage(``);
        setValidTime(true);
        props.setCreditTime(parseInt(value));
      }

    } else {
      setTimeValMessage(`Najprej izberite vrsto kredita `)
    }
    
  };

  /**
   * Handle finish submit 
   */
  const handleSubmit = (event) => {
    event.preventDefault();


    // check if all inputs are ok
    console.log("event submit \n", event)
    if (validPurpose && validAmount && validTime){
      props.handleFinishClick()
    } else {
      setTotalValMessage("Ups, potrebno je odpraviti zgornje napake.")
    }
    

  };  
  

  return ( 
    
    <div>
    <Row className="my-5 justify-content-center">
      <Col className="text-center" xs={12} sm={10}>
        <h4><i>Enostavna pot do najugodnejšega kredita.</i></h4>
      </Col>
    </Row>
    
    <form onSubmit={handleSubmit}>
    {/* CREDIT PURPOSE */}
    <Row className="my-4">
      <Col xs={12} lg={7}>
        <h4>Za kaj potrebujete denar?</h4>
        <Tooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" arrow>
          <Button size="small" variant="outlined" color="secondary">Namig</Button>
        </Tooltip>
      </Col>  
      <Col lg={5}>
      <FormControl component="fieldset">
        <RadioGroup aria-label="creditType" name="creditType" value={props.creditPurpose} onChange={handleCreditPurposeChange}>
          <FormControlLabel value={"nakup-stanovanja"} control={<Radio />} label="Nakup stanovanja" />
          <FormControlLabel value={"adaptacija-stanovanja"} control={<Radio />} label="Adaptacija stanovanja" />
          <FormControlLabel value={"nakup-avtomobila"} control={<Radio />} label="Nakup avtomobila" />
          <FormControlLabel value={"potovanja-poroka"} control={<Radio />} label="Potovanja, poroka" />
          <FormControlLabel value={"drugo"} control={<Radio />} label="Drugo (npr. gotovina, ostali nakupi, ...)" />
        </RadioGroup>
        { validPurpose ? null : <p className="text-danger">Izberite eno od možnosti</p>}
      </FormControl>
      </Col>
    </Row>

    {/* ŽELJEN ZNESEK */}
    <Row className="my-5 py-2">
      <Col xs={12} lg={7}>
        <h4>Izberite željen znesek</h4>
        <Tooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" arrow>
          <Button size="small" variant="outlined" color="secondary">Namig</Button>
        </Tooltip>
      </Col>  
      <Col lg={3}>
      <FormControl>
          {/* TODO: format numbers https://github.com/s-yadav/react-number-format */}
          <Input
              id="standard-adornment-years"
              name="creditTime"
              type="number"
              value={props.creditAmount}
              onChange={handleCreditAmountChange}
              endAdornment={<InputAdornment position="end">EUR</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
              'aria-label': 'EUR',
              }}
          />
         { validAmount ? null : <p className="text-danger">{amountValMessage}</p>}
      </FormControl>
      </Col>
    </Row>


    {/* ŽELJEN ČAS */}
    <Row className="my-5 py-4">
      <Col xs={12} lg={7}>
        <h4>Izberite čas odplačila</h4>
        {/* <a href="javascript:void(0)">Prikaži namig</a>   */}
        <Tooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" arrow>
          <Button size="small" variant="outlined" color="secondary">Namig</Button>
        </Tooltip>
      </Col>  
      
      <Col lg={3}>
      <FormControl>
          {/* TODO: input validation */}
          <Input
              id="standard-adornment-years"
              name="creditTime"
              type="number"
              value={props.creditTime}
              onChange={handleCreditTimeChange}
              endAdornment={<InputAdornment position="end">mesecev</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
              'aria-label': 'mesecev',
              }}
          />
        { validTime ? null : <p className="text-danger">{timeValMessage}</p>}
      </FormControl>
      </Col>
    </Row>

    <Row className="mb-5 justify-content-xs-center justify-content-md-end">
      <Col xs={12} sm={6} lg={4} >
      
      {/* ADD VALIDATION TO FORM */}
        { (totalValMessage != null) ? (<p className="text-danger">{totalValMessage}</p>) : null }
        <Button  className="btn-block" type="submit" variant="contained" color="primary">Izračunaj</Button>
      </Col>
    </Row>

    </form>
    </div>


  )
};


      
