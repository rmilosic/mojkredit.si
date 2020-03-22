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

    
function extractLoanDataGeneric(responseObject, creditAmount){

    let totalLoanCost = responseObject["insuredSumField"] - creditAmount;
    console.log(totalLoanCost)
    
    console.log(responseObject);
    var result = {
        'monthlyAnnuity': numberWithCommas(numberReplaceDecimal(responseObject["annuityField"], ".", ",")),
        'annualInterestRate': numberReplaceDecimal(responseObject["interestAmountField"], ".", ","),
        'totalLoanCost': numberWithCommas(numberReplaceDecimal(totalLoanCost.toFixed(2), ".", ",")),
        'effectiveInterestRate': numberReplaceDecimal(responseObject["eOMField"].toFixed(2), ".", ","),
        'totalAmountPaid': numberWithCommas(numberReplaceDecimal(responseObject["insuredSumField"], ".", ","))
      };

    return result
    
}


module.exports = {

    // basic extract function
    extractLoanDataGeneric: extractLoanDataGeneric,

    // specific extract function

}