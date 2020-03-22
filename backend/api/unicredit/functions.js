// custom functions for parsing 


/**
 * Parse specific loan data return fields
 * @param  {String} monthlyAnnuity 
 * @param  {String} annualInterestRate 
 * @param  {String} totalLoanCost 
 * @param  {String} effectiveInterestRate
 * @param  {String} totalAmountPaid
 * @return {object}         result          
 */
// function parseLoanFields(
//     monthlyAnnuity, annualInterestRate, totalLoanCost, totalAmountPaid, effectiveInterestRate){
// }


function numberReplaceDecimal(x, original, new_){
    return x.toString().replace(original, new_)
}

function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
/**
 * Map response
 * @param  {Object} dictionary
 * @return {Object}         result          
 */

    
function extractLoanDataGeneric(responseObject){
    
    var result = {
        'monthlyAnnuity': numberWithCommas(numberReplaceDecimal(responseObject["annuity"], ".", ",")),
        'annualInterestRate': numberReplaceDecimal(responseObject["interestRateAddition"].toFixed(2), ".", ","),
        'totalLoanCost': numberWithCommas(numberReplaceDecimal(responseObject["interestAmount"], ".", ",")),
        'effectiveInterestRate': numberReplaceDecimal(responseObject["eom"].toFixed(2), ".", ","),
        'totalAmountPaid': numberWithCommas(numberReplaceDecimal(responseObject["insuredSum"], ".", ","))
      };

    return result
    
}


module.exports = {

    // basic extract function
    extractLoanDataGeneric: extractLoanDataGeneric,

    // specific extract function

}