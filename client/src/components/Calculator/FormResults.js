import React, { useState, useEffect } from 'react';
import { Grid, FormControl, Box, Typography, Hidden, IconButton } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { 
    Nav, Navbar, Container, Row, Col, Image, Button, Form } 
  from 'react-bootstrap';

// import components
import OfferRowPanel from './OfferRowPanel';
import Backdrop from './Backdrop';
import RightDrawer from './RightDrawer';
import valueMapper from './utils/calcSetup.yml';
import {replaceChars} from './utils';
import SideConfig from './SideConfig';

// import icons
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import TuneIcon from '@material-ui/icons/Tune';

function FormResults(props) {

    // state management
    const [compareFixedInterestRate, setCompareFixedInterestRate] = useState(true);
    const [processingResolve, setProcessingResolve] = useState(true);
    const [offerList, setOfferList] = useState([]);

    const [drawer, setDrawer] = React.useState(false);
    // var offerListRef = offerList;


    useEffect( () => {
        gatherCalculations(props.activeBanks, props.creditAmount, props.creditType, props.creditTime, props.creditInsurance);
        // set type of interest rate
    }, []);

    
    // TODO: document
    function toggleDrawer (event){
        console.log("toggledrawer triggered");
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        var drawerState = drawer;
        console.log("drawerstate", drawerState);
        setDrawer(!drawerState);
        console.log("setdrawerstate", !drawerState);
    };
    

    /** 
     * Build a url of a given bank with 
     * @param {String} bankName  Name of the bank
     * @return   url
     */
    function getUrl(bankName, creditAmount, creditType, creditTime, creditInsurance){

        // let creditAmount = this.state.formValues["creditAmount"];
        // let creditType = this.state.formValues["creditType"];
        
        // let creditInsurance = valueMapper[bankName]["creditInsurance"][this.state.formValues['creditInsurance']]; 
        
        try {
            var mappedCreditInsurance = valueMapper[bankName]["creditInsurance"][creditInsurance]; 
        } catch (error) {
            console.log(error)
            var mappedCreditInsurance = null;
        }
       

        try {
            var mappedCooperation = valueMapper[bankName]["cooperation"]["true"];
        } catch (error) {
            console.log(error)
            var mappedCooperation = null;
        }
        
        // MULTIPLY YEARS WITH 12 TO GET MONTHS
        let fixedCreditTime = creditTime*12;  
        
        let creditTypeCorrect = replaceChars(creditType);
        let call_url = `${process.env.LAMBDA_HOST}/${bankName}/${creditTypeCorrect}` + 
        `?creditAmount=${creditAmount}&creditInsurance=${mappedCreditInsurance}&creditTime=${fixedCreditTime}&cooperation=${mappedCooperation}`
        
        return call_url
    }


    /** 
     * fetch calculator response for a given bank
     * @param {String} bankName bank name
     * @return {Promise} 
     */
    function fetchResponse(bankName, creditAmount, creditType, creditTime, creditInsurance){
        
        console.log(`Retrieveing result for bank ${bankName}`)
        var url = getUrl(bankName, creditAmount, creditType, creditTime, creditInsurance);

        let request = fetch(url, {
            method: 'GET',
            headers:{
            'Accept': 'application/json'
            }
        }).then(
        response => {
            if (response.ok) {
            response.json().then(json => {
                // TODO: call function to render row with data and logo
                // console.log(`json ${bankName}`, json);
                var data = json["data"];
                
                if (Array.isArray(data)){
                    // true - push all elements
                    // false - push one
                    var pushData = data.map((offer) => {
                        offer["bankName"] = bankName;
                        offer["data"] = offer;
                        return offer
                    });
                    console.log("push data: \n", pushData);

                } else {
                    var pushData = {
                        "bankName": bankName,
                        "data": data
                    }
                    console.log("push data normal: \n", pushData);
                }
                // pushData["data"] = json['data'];
                // pushData["bankName"] = bankName;
                
                setOfferList(offerListRef => offerListRef.concat(pushData));
    
            });
            }
        })
        .catch((error) => {
            console.error(error);
        });

        return request
        
    };
    
    /** 
     * Gather calculations for all active banks
     */
    async function gatherCalculations(activeBanks, creditAmount, creditType, creditTime, creditInsurance){
        // console.log('Triggered gatherCalculations');
        if (!processingResolve) {
            setProcessingResolve(true);
        }
        setOfferList([]);

        // TODO: handle wait 
        await Promise.all(activeBanks.map((bank) => fetchResponse(bank, creditAmount, creditType, creditTime, creditInsurance))).then();
        // await Promise.race(activeBanks.map((bank) => fetchResponse(bank, creditAmount, creditType, creditTime, creditInsurance))).then();
        setProcessingResolve(processingResolve => !processingResolve)
    };

    var omType = compareFixedInterestRate ? "fixed" : "variable";
    var offerItems = offerList.filter(function(e, i){
   
        // retrieve the right data in relation to interest rate type
        if(e["data"][omType] != null){
          return true;
        }
          return false;
        })
        .map(function (e, i){
          return <OfferRowPanel key={i}  
                bankName={e["bankName"] }  
                monthlyAnnuity={e["data"][omType]["monthlyAnnuity"] }  
                annualInterestRate={e["data"][omType]["annualInterestRate"] }  
                totalLoanCost={e["data"][omType]["totalLoanCost"] }  
                effectiveInterestRate={e["data"][omType]["effectiveInterestRate"] }  
                totalAmountPaid={e["data"][omType]["totalAmountPaid"]}
                />
    });

    /**
     * Handle change in interest rate type comparison
     */
    function handleComparisonChange() {
        let comparisonState = compareFixedInterestRate;
        let newComparisonState = comparisonState ? false : true;
        
        setCompareFixedInterestRate(newComparisonState);
    }

    const handleSubmit = (event) => {
        gatherCalculations(props.activeBanks, props.creditAmount, props.creditType, props.creditTime, props.creditInsurance);
    }

    return (

        <div>
        

        <Row>
            {/* Desktop config */}
            <Col className="d-none d-lg-block mt-lg-5" lg={4}>
                
                <div className="bg-white shadow-sm">
                <Container>
                    <SideConfig 
                        creditType={props.creditType}
                        creditAmount={props.creditAmount}
                        creditTime={props.creditTime}
                        creditAffiliation={props.creditAffiliation}
                        creditInsurance={props.creditInsurance}
                        handleChange={props.handleChange} 
                        handleFinishClick={props.handleFinishClick}
                        availableBankSkills={props.availableBankSkills}
                        activeBanks={props.activeBanks} />

                    <Row className="mt-3 justify-content-center">
                        <Col>
                            <Button variant="primary" onClick={handleSubmit} block>Potrdi</Button>
                        </Col>
                    </Row>
                </Container>
                </div>
            </Col>

            {/* Mobile and tablet results */}
            <Col xs={12} lg={8}>

                {/* heading and config toggle */}
                <Row className="justify-content-between pt-4">
                    <Col>
                        <h4>Rezultati</h4>
                    </Col>
                    <Col xs={2} >
                        <div onClick={props.backToStart}>
                            <IconButton>
                                <RotateLeftIcon/>
                            </IconButton> 
                        </div>
                    </Col>
                    <Col xs={2} className="d-lg-none-right">
                        <div onClick={toggleDrawer}>
                            <IconButton>
                                <TuneIcon/>
                            </IconButton> 
                        </div>
                        
                        
                    </Col>
                </Row>

                {/* toggle interest rate */}
                <Row>
                    <Col>
                        <FormControl required={true}>
                            <RadioGroup aria-label="interestRateType"  
                            name="interestRateType" 
                            value={compareFixedInterestRate ? "fiksnaOM" : "spremenljivaOM"}  
                            onChange={handleComparisonChange}
                            row>
                                
                            
                            <FormControlLabel value={"fiksnaOM"} control={<Radio />} label={"Fiksna OM"} />
                            <FormControlLabel value={"spremenljivaOM"} control={<Radio />} label={"Variabilna OM"} />

                            </RadioGroup>
                        
                        </FormControl>
                    </Col>
                </Row>
                
                {/* DISPLAY OFFER ITEMS */}
                { processingResolve ? (
                    <Backdrop/>
                ) : (
            
                    (offerItems.length) > 0 ? 
                    <Row className="justify-content-center">
                        <Col xs={12}>{offerItems}</Col>
                    </Row>
                    : (
                    <Row className="justify-content-center">
                        <Col xs={12}>
                            <h2>Za izbrane parametre nismo našli rezultatov</h2>
                        </Col>
                    </Row>
                    )
                )}

            </Col>
        </Row>

        {<RightDrawer 
        state={drawer} 
        toggleDrawer={toggleDrawer}
        creditType={props.creditType}
        creditAmount={props.creditAmount}
        creditTime={props.creditTime}
        creditAffiliation={props.creditAffiliation}
        creditInsurance={props.creditInsurance}
        handleChange={props.handleChange} 
        creditValueRangeMapper={props.creditValueRangeMapper} 
        handleFinishClick={props.handleFinishClick}
        availableBankSkills={props.availableBankSkills}
        activeBanks={props.activeBanks}
        gatherCalculations={gatherCalculations}
        />} 
    
            
    </div>
)};

export default FormResults;
