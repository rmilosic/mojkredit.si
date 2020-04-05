import React, { useState, useEffect } from 'react';
import { Grid, FormControl, Box, Typography, Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import OfferRowPanel from './OfferRowPanel';
import Backdrop from './Backdrop';

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
                
        {/* TOGGLE BUTTON FOR INTEREST RATE COMPARISON  */}
        <Grid container spacing={2} justify="center">

            <Grid item xs={12} md={3}>
            <Grid item xs={12} md={12}>
                <Hidden smDown>
                <Box pt={"4em"}/>
                </Hidden>
                <Button onClick={props.backToStart} 
                    variant="outlined"
                    color="secondary"
                    fullWidth={true}>
                        Nazaj na izračun
                </Button>
            </Grid>
            
            <Grid item xs={12} md={12}>
                <Box pt={"1em"}/>
                
                <FormControl required={true}>
                {/* XS SM ROW */}
                <Hidden mdUp>
                    <Typography variant="caption"><strong>Tip obrestne mere</strong></Typography>
                    <RadioGroup aria-label="interestRateType"  
                    name="interestRateType" 
                    value={compareFixedInterestRate ? "fiksnaOM" : "spremenljivaOM"}  
                    onChange={handleComparisonChange}
                    row>
                        
                    
                    <FormControlLabel value={"fiksnaOM"} control={<Radio />} label={"Fiksna"} />
                    <FormControlLabel value={"spremenljivaOM"} control={<Radio />} label={"Variabilna"} />

                    </RadioGroup>
                </Hidden>
                
                {/* SM UP */}
                <Hidden smDown>
                    <RadioGroup aria-label="interestRateType"  
                    name="interestRateType" 
                    value={compareFixedInterestRate ? "fiksnaOM" : "spremenljivaOM"}  
                    onChange={handleComparisonChange}>
                        
                    <span><strong>Tip obrestne mere</strong></span>
                    <FormControlLabel value={"fiksnaOM"} control={<Radio />} label={"Fiksna"} />
                    <FormControlLabel value={"spremenljivaOM"} control={<Radio />} label={"Variabilna"} />

                    </RadioGroup>
                </Hidden>
                
                </FormControl>
            </Grid>
            </Grid>
        
            <Grid item xs={12} sm={10} md={9}>
            {/* DISPLAY OFFER ITEMS */}
            { processingResolve ? (
                <Backdrop/>
            ) : (
        
                (offerItems.length) > 0 ? 
                <div>{offerItems}</div> 
                : <Typography variant="h3">No results found for your search</Typography>
            )}
            </Grid> 
        </Grid>
    </div>
)};

export default FormResults;
