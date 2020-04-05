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

// import icons
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import TuneIcon from '@material-ui/icons/Tune';

function FormResults(props) {
    const [compareFixedInterestRate, setCompareFixedInterestRate] = useState(true);
    const [processingResolve, setProcessingResolve] = useState(true);
    const [offerList, setOfferList] = useState([]);

    // var offerListRef = offerList;
    


    /** 
     * fetch calculator response for a given bank
     * @param {String} bankName bank name
     * @return {Promise} 
     */
    function fetchResponse(bankName){
        
        
        var url = props.getUrl(bankName);

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
                var pushData = {}
                pushData["data"] = json['data'];
                pushData["bankName"] = bankName;
                
                setOfferList(offerListRef => offerListRef.concat(pushData));
    
            });
            }
        })
        .catch((error) =>{
            console.error(error);
        });

        return request
        
    };
    
    /** 
     * Gather calculations for all active banks
     */
    async function gatherCalculations(activeBanks){
        console.log('Triggered gatherCalculations');
        
        // TODO: handle wait
        await Promise.all(activeBanks.map((bank) => fetchResponse(bank))).then(
        );
        setProcessingResolve(processingResolve => !processingResolve)

    };

    useEffect(() => {
        gatherCalculations(props.activeBanks);
        // set type of interest rate
    }, []);


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

    return (

    <div>
        

        <Row>
            {/* Desktop config */}
            <Col className="d-none d-lg-block mt-lg-5" lg={4}>
                {/* <Row className="bg-white shadow-sm">
b                    config
                </Row> */}
            </Col>

            {/* Mobile and tablet results */}
            <Col xs={12} lg={8}>

                {/* heading and config toggle */}
                <Row className="justify-content-between pt-4">
                    <Col>
                        <h4>Rezultati</h4>
                    </Col>
                    <Col xs={2} className="text-right">
                        <div onClick={props.backToStart}>
                            <IconButton>
                                <RotateLeftIcon/>
                            </IconButton> 
                        </div>
                    </Col>
                    <Col xs={2} className="d-lg-none-right">
                        <div>
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
        

        

        
            
    </div>
)};

export default FormResults;
