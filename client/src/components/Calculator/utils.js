
import creditRangeMap from './utils/creditRangeMap.yml';



function getCandidateValues(finalValue, creditInsurance, creditType, activeBanks){
    
    var candidateValues = [];
    // iterate banks
    Object.entries(creditRangeMap).forEach(([bank, creditTypeDict]) => {
        if (activeBanks.includes(bank)) {
            
            Object.entries(creditTypeDict).forEach(([availableCreditType, insuranceTypeDict]) => {
                
                if (availableCreditType === creditType){

                    // select target value and append to final list
                    // iterate insurance types

                    Object.entries(insuranceTypeDict['creditInsurance']).forEach(([availableInsuranceType, valueMap]) => {
                        // console.log(`Insurance type ${insuranceType}`)
                        // console.log(`Insurance type ${creditInsurance}`)
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
    let replaceList={ "č":"c", "š":"s", "ž":"z" };
    var new_text = txt.replace(/č|ž|š/g, function(match) {return replaceList[match];})
    return new_text
  }

export default {getHighestMinValue, getLowestMaxValue, getMaxValue, getMinValue, replaceChars}