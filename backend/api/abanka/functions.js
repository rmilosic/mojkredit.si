// custom functions for parsing 

const htmlParser = require('node-html-parser');

/**
 * Parse a number with dots as decimal separator
 * to dots as thousand separator and comma as decimal sep
 * @param  {String} x string number of format '21341.80'
 * @return {object}         result          
 */
function strNumToCommaSep(x) {

    return x.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Parse specific loan data return fields
 * @param  {String} monthlyAnnuity 
 * @param  {String} annualInterestRate 
 * @param  {String} totalLoanCost 
 * @param  {String} effectiveInterestRate
 * @param  {String} totalAmountPaid
 * @return {object}         result          
 */
function parseLoanFields(
    monthlyAnnuity, annualInterestRate, totalLoanCost, totalAmountPaid, effectiveInterestRate){
    
    // var result = {
    //     "monthlyAnnuity": strNumToCommaSep(parseFloat(monthlyAnnuity.replace(".", "").replace(",", ".")).toFixed(2)),
    //     "annualInterestRate": strNumToCommaSep(parseFloat(annualInterestRate.replace(".", "").replace(",", ".")).toFixed(2)),
    //     "totalLoanCost": strNumToCommaSep(totalLoanCost.toFixed(2)),
    //     "effectiveInterestRate": strNumToCommaSep(parseFloat(effectiveInterestRate.replace(".", "").replace(",", ".")).toFixed(2)),
    //     "totalAmountPaid": strNumToCommaSep(totalAmountPaid),
    //     }
    if (annualInterestRate.split('%').length == 1){
        annualInterestRate = parseFloat(annualInterestRate.split(" + ")[1].replace(",", ".")).toFixed(2).toString().replace(".", ",");
    } else {
        annualInterestRate = annualInterestRate.split('%')[0].trim()
    }
    var result = {
    "monthlyAnnuity": monthlyAnnuity,
    "annualInterestRate": annualInterestRate,
    "totalLoanCost": totalLoanCost,
    "effectiveInterestRate": effectiveInterestRate,
    "totalAmountPaid": totalAmountPaid
    }

    
    return result
}



/**
 * Extract generic loan data 
 * @param  {object} data response obeject
 * @return {object}         result          
 */
function extractLoanDataGeneric(data){
    
   
    var calculations = data['calculations'];

    var result = calculations.map((calc) => {
        console.log("calc", calc);
        var monthlyAnnuity = calc['monthlyPayment'].split(" EUR")[0];
        var annualInterestRate = calc['interestRate'];
        var totalLoanCost = calc['sumCosts'].split(" EUR")[0];
        var totalAmountPaid = calc['totalAmountToPay'].split(" EUR")[0];
        var effectiveInterestRate = calc['effectiveInterestRate'];
        
        var loanFields = parseLoanFields(monthlyAnnuity, annualInterestRate, totalLoanCost, totalAmountPaid, effectiveInterestRate);
        loanFields["offerTitle"] = calc['productType'];

        switch (calc["interestRateLegalTextKey"]) {
            case "variableInterestRate":
                loanFields["omType"] = "variable";
                break;
            
            case "fixedInterestRate":
                loanFields["omType"] = "fixed";
                break;
        }

        
        return loanFields;
    })


    console.log("result \n", result);
    

    return result
}

module.exports = {

    // basic extract function
    extractLoanDataGeneric: extractLoanDataGeneric,

}