
import creditRangeMap from './utils/creditRangeMap.yml';


/**
 * Get specific candidate values 
 * @param {["max_time", "min_time", "max_amount", "min_amount"]} finalValue 
 * @param {*} creditInsurance 
 * @param {*} creditType 
 * @param {*} activeBanks 
 */
function getCandidateValues(finalValue, creditInsurance, creditType, activeBanks){
    
    var candidateValues = [];
    // iterate banks
    console.log("triggered get candidate values");
    Object.entries(creditRangeMap).forEach(([bank, creditTypeDict]) => {
        if (activeBanks.includes(bank)) {
            
            Object.entries(creditTypeDict).forEach(([availableCreditType, insuranceTypeDict]) => {
                
                if (availableCreditType === creditType){

                    // select target value and append to final list
                    // iterate insurance types

                    Object.entries(insuranceTypeDict['creditInsurance']).forEach(([availableInsuranceType, valueMap]) => {
                        console.log(`Insurance type ${availableInsuranceType}`)
                        console.log(`valueMap ${valueMap}`)

                        if (availableInsuranceType === creditInsurance){
                            // select target value and append to final list
                            // console.log(valueMap)
                            var targetValue = valueMap[finalValue]
                            // console.log(`Target value ${targetValue}`)
                            candidateValues.push(targetValue)
                        }
                    })
                }
            }) 
        } else {
            // console.log(`activeBanks doesnt include ${bank}`)
        }
    });
    return candidateValues
}

// TODO: document

/**
 * Get all desired valueTypes for banks and credit types
 * @param {String} valueType 
 * @param {Array} creditTypes 
 * @param {Array} activeBanks 
 */
function getAnyBankCreditValues(valueType, creditTypes, activeBanks) {
    var candidateValues = [];

    console.log("triggered func getanycreditvalues");
    Object.entries(creditRangeMap).forEach(([bank, creditTypeDict]) => {
        console.log("bank", bank);
        console.log("credittypeDict", creditTypeDict);

        if (activeBanks.includes(bank)) {
            
            Object.entries(creditTypeDict).forEach(([availableCreditType, insuranceTypeDict]) => {
                
                
                if (creditTypes.includes(availableCreditType)){
                    
                    console.log("availableCreditType", availableCreditType);
                    console.log("insuranceTypeDict", insuranceTypeDict);
                    // select target value and append to final list
                    // iterate insurance types

                    Object.entries(insuranceTypeDict).forEach(([insuranceCondition, conditionMap]) => {
                        console.log(`insuranceCondition ${insuranceCondition}`)
                        console.log("conditionMap", conditionMap);
                        
                        Object.entries(conditionMap).forEach(([availableCreditType, valueMap]) => {

                        // select target value and append to final list
                        console.log(valueMap)
                        var targetValue = valueMap[valueType];
                        // console.log(`Target value ${targetValue}`)
                        candidateValues.push(targetValue)

                        })

                    })
                }
            }) 
        } 
    });
    return candidateValues;
}

/**
 * Get consolidated values
 * @param {["max", "min"]} type 
 * @param {["min_time", "max_time", "min_amount", "max_amount"]} finalValue 
 * @param {Array} activeBanks 
 * @param {Array} creditTypes 
 */
export function getConsolidatedValues(type, finalValue, creditTypes, activeBanks){
    // const keys = Object.keys(driversCounter);
    console.log("triggered func cons values");
    var candidateValues = getAnyBankCreditValues(finalValue, creditTypes, activeBanks)
    var finalValue = null;

    
    console.log("candidates", candidateValues);
    if (type == 'min'){
        finalValue = Math.min(...candidateValues);
    } if (type == 'max'){
        finalValue = Math.max(...candidateValues);
    }

    return finalValue;
}



export function getHighestMinValue(finalValue, creditInsurance, creditType, activeBanks){
     // const keys = Object.keys(driversCounter);
     var candidateValues = getCandidateValues(finalValue, creditInsurance, creditType, activeBanks)
     var highestMinValue = Array.max(candidateValues)
     return highestMinValue
}

//  TODO: document
export function getLowestMaxValue(finalValue, creditInsurance, creditType, activeBanks){
    // const keys = Object.keys(driversCounter);
    var candidateValues = getCandidateValues(finalValue, creditInsurance, creditType, activeBanks)       
    var lowestMaxValue = Array.min(candidateValues)
    return lowestMaxValue
}

export function getMaxValue(finalValue, creditInsurance, creditType, activeBanks){
    // const keys = Object.keys(driversCounter);
    var candidateValues = getCandidateValues(finalValue, creditInsurance, creditType, activeBanks)       
    var maxValue = Array.max(candidateValues)
    return maxValue
}

export function getMinValue(finalValue, creditInsurance, creditType, activeBanks){
    // const keys = Object.keys(driversCounter);
    var candidateValues = getCandidateValues(finalValue, creditInsurance, creditType, activeBanks)       
    var minValue = Array.min(candidateValues)
    return minValue
}

export function replaceChars (txt) {
    // console.log("txt replace: ", txt)    ;
    let replaceList={ "č":"c", "š":"s", "ž":"z" };

    return txt.replace(/č|ž|š/g, function(match) {return replaceList[match];})
    
  }

export function toTitleCase(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

export default {
    getHighestMinValue, getLowestMaxValue, 
    getMaxValue, getMinValue, 
    replaceChars, getConsolidatedValues, toTitleCase}