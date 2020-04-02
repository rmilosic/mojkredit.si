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
    
    var result = {
        "monthlyAnnuity": strNumToCommaSep(parseFloat(monthlyAnnuity.replace(".", "").replace(",", ".")).toFixed(2)),
        "annualInterestRate": strNumToCommaSep(parseFloat(annualInterestRate.replace(".", "").replace(",", ".")).toFixed(2)),
        "totalLoanCost": strNumToCommaSep(totalLoanCost.toFixed(2)),
        "effectiveInterestRate": strNumToCommaSep(parseFloat(effectiveInterestRate.replace(".", "").replace(",", ".")).toFixed(2)),
        "totalAmountPaid": strNumToCommaSep(totalAmountPaid),
        }

    return result
}



/**
 * Extract generic loan data 
 * @param  {object} data response obeject
 * @return {object}         result          
 */
function extractLoanDataGeneric(data){
    
    var monthlyAnnuity = data["Višina mesečne obremenitve"];
    var annualInterestRate = data["Obrestna mera"];
    if ("Obrestna mera" in data){
        var  annualInterestRate = data["Obrestna mera"];
    } else {
        var  annualInterestRate = data["Nominalna obrestna mera"];
    }
    var totalAmountPaid = parseFloat(data["Skupni znesek kredita, ki ga plača kreditojemalec"]
        .split(" EUR")[0].replace(".", "").replace(",", ".")).toFixed(2);
    var effectiveInterestRate = data["Letna efektivna obrestna mera"];

    // calculate toal loan cost
    var creditAmount = parseFloat(data["Znesek kredita"]
        .split(" EUR")[0].replace(".", "").replace(",", ".")).toFixed(2);
    var totalLoanCost = totalAmountPaid - creditAmount;
    // console.log("creditAmount: ", creditAmount);
    // console.log("totalAmountPaid: ", totalAmountPaid);
    // console.log("totalLoanCost: ", totalLoanCost);

    var result = parseLoanFields(
        monthlyAnnuity=monthlyAnnuity,
        annualInterestRate=annualInterestRate,
        totalLoanCost=totalLoanCost,
        totalAmountPaid=totalAmountPaid,
        effectiveInterestRate=effectiveInterestRate
    )
    
    return result
}

module.exports = {

    // basic extract function
    extractLoanDataGeneric: extractLoanDataGeneric,

}