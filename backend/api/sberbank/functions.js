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
function parseLoanFields(
    monthlyAnnuity, annualInterestRate, totalLoanCost, totalAmountPaid, effectiveInterestRate){
    
    var result = {
        "monthlyAnnuity": monthlyAnnuity.replace(/(\r\n|\r|\n|€| )/g, ""),
        "annualInterestRate": annualInterestRate.replace(/(\r\n|\r|\n)/g, "").split("%")[0].trim(),
        "totalLoanCost": totalLoanCost.replace(/(\r\n|\r|\n|€| )/g, ""),
        "effectiveInterestRate": effectiveInterestRate.replace(/(\r\n|\r|\n|€| )/g, "").split("%")[0].trim(),
        "totalAmountPaid": totalAmountPaid.replace(/(\r\n|\r|\n|€| )/g, "")
        }

    return result
}


/**
 * Extract loan data for hitri kredit 
 * @param  {String} body response body
 * @return {object}         result          
 */
function extractLoanDataHitri(body){
    
    var parsedBodyRoot = htmlParser.parse(body.toString())

    var monthlyAnnuity = parsedBodyRoot.querySelectorAll(".calculation-item")[0].querySelectorAll("div")[1].rawText
    var annualInterestRate = parsedBodyRoot.querySelectorAll(".calculation-item")[6].querySelectorAll("div")[1].rawText
    var totalLoanCost = parsedBodyRoot.querySelectorAll(".calculation-item")[9].querySelectorAll("div")[1].rawText
    var effectiveInterestRate = parsedBodyRoot.querySelectorAll(".calculation-item")[10].querySelectorAll("div")[1].rawText
    var totalAmountPaid = parsedBodyRoot.querySelectorAll(".calculation-item")[11].querySelectorAll("div")[1].rawText
    
    var result = parseLoanFields(
        monthlyAnnuity=monthlyAnnuity,
        annualInterestRate=annualInterestRate,
        totalLoanCost=totalLoanCost,
        totalAmountPaid=totalAmountPaid,
        effectiveInterestRate=effectiveInterestRate
    )
    
    return result
}

/**
 * Extract generic loan data (other than hitri kredit)
 * @param  {String} body response body
 * @return {object}         result          
 */
function extractLoanDataGeneric(body){

    var parsedBodyRoot = htmlParser.parse(body.toString())

    var monthlyAnnuity = parsedBodyRoot.querySelectorAll(".calculation-item")[0].querySelectorAll("div")[1].rawText
    var annualInterestRate = parsedBodyRoot.querySelectorAll(".calculation-item")[6].querySelectorAll("div")[1].rawText
    var totalLoanCost = parsedBodyRoot.querySelectorAll(".calculation-item")[10].querySelectorAll("div")[1].rawText
    var effectiveInterestRate = parsedBodyRoot.querySelectorAll(".calculation-item")[11].querySelectorAll("div")[1].rawText
    var totalAmountPaid = parsedBodyRoot.querySelectorAll(".calculation-item")[12].querySelectorAll("div")[1].rawText


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

    // specific extract function
    extractLoanDataHitri: extractLoanDataHitri
}