import React, { useState, useEffect } from 'react';
import { Grid, FormControl, Box, Typography, Hidden, IconButton } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { 
    Nav, Navbar, Container, Row, Col, Image, Button, Form } 
  from 'react-bootstrap';

// import config
import bankSkills from './utils/bankSkills.yml';
import calcSetup from './utils/calcSetup.yml';
import { toTitleCase } from './utils';

// import components
// import OfferRowPanel from './OfferRowPanel';
import OfferRowWhole from './OfferRowWhole';
import Backdrop from './Backdrop';
import RightDrawer from './RightDrawer';
import valueMapper from './utils/calcSetup.yml';
import {replaceChars} from './utils';
import SideConfig from './SideConfig';

// import icons
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import TuneIcon from '@material-ui/icons/Tune';
import InfoIcon from '@material-ui/icons/Info';

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
     * Make fetch items based on input parameters
     * @param {String} bankName  Name of the bank
     * @param {Int} creditAmount  Credit amount
     * @param {Array} creditType  Selected credit types
     * @param {Int} creditTime  Credit time
     * @return   url
     */
    function getFetchItems(bankName, creditAmount, creditTypes, creditTime){

        // let creditAmount = this.state.formValues["creditAmount"];
        // let creditType = this.state.formValues["creditType"];
        
        // let creditInsurance = valueMapper[bankName]["creditInsurance"][this.state.formValues['creditInsurance']]; 
        console.log("geturl props ", arguments);
        var urlList = [];



        // get bank config object
        var bankConfig = calcSetup[bankName];
        var creditInsuranceMap = bankConfig["creditInsurance"];
        var cooperationMap = bankConfig["cooperation"];
        
        // get possible insurance & coop options
        var possibleInsurances = [];
        var possibleCooperation = [];

        // if (creditInsuranceMap != null){
        //     Object.entries(creditInsuranceMap).forEach(([insuranceName, value]) => {
        //         console.log("ins name: ", insuranceName);
        //         console.log("ins value: ", value);
        //         possibleInsurances.push(value);
        //     });
        // } else {
        //     possibleInsurances.push(null)
        // }

        // if (cooperationMap != null){
        //     Object.entries(cooperationMap).forEach(([cooperation, value]) => {
        //         console.log("coop name: ", cooperation);
        //         console.log("coop value: ", value);
        //         possibleCooperation.push(value);
        //     });
        // }
        console.log("possible ins: ", possibleInsurances);
        console.log("possible coop: ", possibleCooperation);
        
        console.log("bankconfig: ", bankConfig);

        var combinations = [];

        Object.entries(creditInsuranceMap).forEach(([insName, insValue]) => {

            Object.entries(cooperationMap).forEach(([coopName, coopValue]) => {
                var combination = {
                    "cooperation": {},
                    "insurance": {}
                }
                combination["cooperation"] = [coopName, coopValue];
                combination["insurance"] = [insName, insValue];

                combinations.push(combination);
            })
        });
        console.log("combinations: ", combinations);

        // for all applicable credittypes (list), iterate and create retrieval objects
        var fetchItems = [];

        creditTypes.forEach((creditType) => {
            // if bank has credit type skill
            
            console.log("credit: ", creditType)
            console.log("bankskills: ", bankSkills);
            
            // use fetchItems to store the offer request items
            
            // if bank is able to provide credit, make combinations of available parameters
            // and generate possible url combinations, also make a retrieval object storing
            // offer credit request information
            if (bankSkills[creditType].includes(bankName)){
                
                combinations.map((combination) => {
                    // new instance of fetchItem
                    var fetchItem = {
                    "bank": bankName,
                    "creditType": creditType,
                    "cooperation": null,
                    "creditInsurance": null,
                    "url": null,
                    };
                    
                    // fetch combination detials, name and value
                    let [insuranceName, insuranceValue] = combination["insurance"];
                    let [cooperationType, coopeartionValue] = combination["cooperation"];
                    // update fetchitem instance with combination details and generate url, push whole item
                    // to fetchitems array
                    fetchItem["creditInsurance"] = insuranceName;
                    fetchItem["cooperation"] = cooperationType;

                    let creditTypeCorrect = replaceChars(creditType);
                    let queryParams = `?creditAmount=${creditAmount}&creditInsurance=${insuranceValue}&creditTime=${creditTime}&cooperation=${coopeartionValue}`
                    let call_url = `${process.env.LAMBDA_HOST}/${bankName}/${creditTypeCorrect}` + queryParams
                    
                    fetchItem["url"] = call_url; 
                    
                    fetchItems.push(fetchItem);
                });
            }
        });

        // try {
        //     var mappedCreditInsurance = valueMapper[bankName]["creditInsurance"][creditInsurance]; 
        // } catch (error) {
        //     console.log(error)
        //     var mappedCreditInsurance = null;
        // }
       

        // try {
        //     var mappedCooperation = valueMapper[bankName]["cooperation"]["true"];
        // } catch (error) {
        //     console.log(error)
        //     var mappedCooperation = null;
        // }
        
        // // MULTIPLY YEARS WITH 12 TO GET MONTHS
        // // let fixedCreditTime = creditTime*12;  
        
        // let creditTypeCorrect = replaceChars(creditType);
        // let call_url = `${process.env.LAMBDA_HOST}/${bankName}/${creditTypeCorrect}` + 
        // `?creditAmount=${creditAmount}&creditInsurance=${mappedCreditInsurance}&creditTime=${creditTime}&cooperation=${mappedCooperation}`
        
        return fetchItems
    }


    /** 
     * fetch calculator response for a given bank
     * @param {String} bankName bank name
     * @return {Promise} 
     */
    function fetchResponses(bankName, creditAmount, creditType, creditTime){
        
        console.log(`Retrieveing result for bank ${bankName}`)
        var fetchItems = getFetchItems(bankName, creditAmount, creditType, creditTime);
        
        var requestItems = fetchItems.map((fetchItem) => {
            // iterate list and fetch
            let request = fetch(fetchItem["url"], {
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

                    var responseList = json["data"];
                    
                    // if response is not array, convert it to one
                    if (!Array.isArray(responseList)){
                        responseList = [responseList];
                    }
                    

                    // true - push all elements
                    // false - push one
                    var pushData = responseList.map((offer) => {
                        offer["bankName"] = bankName;
                        offer["creditType"] = fetchItem["creditType"];
                        offer["cooperation"] = fetchItem["cooperation"];
                        offer["creditInsurance"] = fetchItem["creditInsurance"];
                        offer["data"] = offer;
                        offer["offerTitle"] = (offer["offerTitle"] != null) ? offer["offerTitle"] : `${toTitleCase(bankName)} ${fetchItem["creditType"]} kredit`;
                        return offer
                    });
                    console.log("push data: \n", pushData);

                    
                    setOfferList(offerListRef => offerListRef.concat(pushData));
        
                });
                }
            })
            .catch((error) => {
                console.error(error);
            });
        
        return request

        });

        console.log("req items: ", requestItems);
        return requestItems
    };
    
    /** 
     * Gather calculations for all active banks
     */
    async function gatherCalculations(activeBanks, creditAmount, creditType, creditTime){
        // console.log('Triggered gatherCalculations');
        if (!processingResolve) {
            setProcessingResolve(true);
        }
        setOfferList([]);

        // TODO: handle wait 
        await Promise.all(activeBanks.map((bank) => fetchResponses(bank, creditAmount, creditType, creditTime))).then();
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
          return <OfferRowWhole key={i}  
                bankName={e["bankName"] }  
                offerTitle={e["offerTitle"]}
                cooperation={e["cooperation"]}
                creditType={e["creditType"]}
                creditInsurance={e["creditInsurance"]}
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
        
        <Container>
        <Row>
            {/* Desktop config */}
            <Col className="d-none d-lg-block mt-lg-5" lg={3}>
                
                <div className="bg-white shadow-sm">
                {/* <Container>
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
                </Container> */}
                </div>
            </Col>

            {/* Mobile and tablet results */}
            <Col xs={12} lg={9}>

                {/* heading and config toggle */}
                {/* <Row className="justify-content-between pt-4">
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
                </Row> */}
                

                {/* toggle */}
                
                <Row className="justify-content-center">
                    <Col>
                        <Button variant="dark"><small>Ponastavi</small></Button>
                        <Button variant="dark"><small>Uredis</small></Button>
                    </Col>
                </Row>
               
                {/* DISPLAY OFFER ITEMS */}
                {/* if loading screen, display backgdrop */}
                { processingResolve ? (
                    <Backdrop/>
                ) : (
            
                    (offerItems.length) > 0 ?
                    <div>
                    <Row>
                    <Col>
                        <InfoIcon/><span>Prikazani rezultati so informativne narave</span>
                    </Col>
                    </Row> 
                    <Row className="justify-content-center">
                        <Col xs={12}>{offerItems}</Col>
                    </Row>
                    </div>
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

        {/* {<RightDrawer 
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
        />}  */}
    
    </Container>   
    </div>
)};

export default FormResults;
