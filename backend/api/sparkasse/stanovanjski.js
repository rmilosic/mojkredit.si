'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');
const querystring = require('querystring');


console.log('Loading function');

module.exports.handler = (event, context, callback) => {

  console.log(event);

  // return object
  var finalResult = {
    fixed: null,
    variable: null
  }

  var queryData = event.queryStringParameters;
  
  console.log(queryData);

  let creditTimeYears = queryData['creditTime'] / 12;

  // QUERYSTRING
  let message = `intTipKredita=2&decVolumen=${Math.round(queryData['creditAmount'])}&intSteviloOdplacilLeto=${creditTimeYears}&VelikostStanovanja=&MojaPlaca=&MesecneObveznosti=&DrugeMesecneObveznosti=&PartnerPlaca=&PartnerMesecneObveznosti=&PartnerDrugeMesecneObveznosti=`
  let queryString = querystring.parse(message, null, null);

  var options = {
    "data": querystring.encode(queryString),
    "options": {
      "host": "sparkasse.si",
      "path": "/sl-si/ajax/kr_izracun_odplacilo",
      "method": "POST",
      "headers": {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //"Cookie": "ASP.NET_SessionId=l3nillj4s0lj2zriyrzarz3h",
        "Host": "sparkasse.si",
        "Origin": "https://sparkasse.si",
        "Referer": "https://sparkasse.si/sl-si/prebivalstvo/krediti/kreditni-kalkulatorji",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
      }
    }
  }
  console.log(options.data);

  // console.log(event);


  const req = https.request(options.options, (res) => {
    
    let body = '';

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk.toString();
    });
    res.on('end', () => {

      let bodyDict = JSON.parse(body);
      
      console.log(bodyDict);
      
      let fixedResponse = bodyDict['itemFix']['Data'];
      let variableResponse = bodyDict['itemVar']['Data'];

      console.log("finalResult", finalResult)
      console.log("fixedResponse", fixedResponse)

      finalResult["fixed"] = {
        'monthlyAnnuity': fixedResponse["annuityField"],
        'annualInterestRate': fixedResponse["interestAmountField"],
        'totalLoanCost': fixedResponse["expenseValueField"],
        'effectiveInterestRate': fixedResponse["eOMField"],
        'totalAmountPaid': fixedResponse["insuredSumField"]
      };

      finalResult["variable"] = {
        'monthlyAnnuity': variableResponse["annuityField"],
        'annualInterestRate': variableResponse["interestAmountField"],
        'totalLoanCost': variableResponse["expenseValueField"],
        'effectiveInterestRate': variableResponse["eOMField"],
        'totalAmountPaid': variableResponse["insuredSumField"]
      };

      callback(null, {
        statusCode: 200,
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          "message": 'Executed successfully',
          "input": event,
          "data": finalResult
        })
      })
    });
      
  });

  req.on('error', callback);
  
  req.write(options.data);
  req.end();
  

};
