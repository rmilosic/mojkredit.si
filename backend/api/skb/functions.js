// custom functions for parsing 

const htmlParser = require('node-html-parser');


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


/**
 * Extract loan data for hitri kredit 
 * @param  {String} body response body
 * @return {object}         result          
 */
    
function extractLoanDataGeneric(htmlSection){
    
    let returnData = {};

    htmlSection.querySelectorAll(".infResultHeader").map((elem) => {
        elem.querySelectorAll("table tr td").map((elem) => {
    
        var splitFields = elem.structuredText.split("\n");
        returnData[splitFields[0]] = splitFields[1]
        })
    })
    
    htmlSection.querySelectorAll(".infResultContent").map((elem) => {
        elem.querySelectorAll("tr").slice(1, -1).map((elem) => {
        var _key = elem.querySelectorAll("td")[0].rawText.replace(':', '');
        var _value = elem.querySelectorAll("td")[1].rawText
        returnData[_key] = _value
        })
    })
    

    // pass to parsing function
    var responseData = {
        "monthlyAnnuity": returnData['Mesečna anuiteta'].split(" ")[0],
        "annualInterestRate": returnData['Obrestna mera'].split("%")[0].trim(),
        "totalLoanCost": returnData['Skupni stroški kredita'].split(" ")[0],
        "effectiveInterestRate": returnData['Efektivna obrestna mera (EOM)'].split("%")[0].trim(),
        "totalAmountPaid": returnData['Skupni znesek, ki ga mora plačati potrošnik'].split(" ")[0],
    }
    
    return responseData
    
}


module.exports = {

    // basic extract function
    extractLoanDataGeneric: extractLoanDataGeneric,

    // specific extract function

}