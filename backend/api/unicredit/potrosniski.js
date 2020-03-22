'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');
const querystring = require('querystring');
var functions = require('./functions');


console.log('Loading function');

module.exports.handler = (event, context, callback) => {

  console.log(event);

  // return object
  var finalResult = {
    fixed: null,
    variable: null
  }
  
  function pushData(type, result){
    finalResult[type] = result;
  }

  var queryData = event.queryStringParameters;
  
  console.log(queryData);

  
  // let queryString = querystring.parse(message, null, null);
  var postData = querystring.stringify({
      "id":9,"amount": queryData["creditAmount"],"period": queryData["creditTime"],"isClient": true,"amountMin":500,"amountMax":30000,"periodMin":3,"periodMax":84,"carValue":0,"carYear":null,"annuityMin":30,"annuityMax":11000,"calcByAnnuity":false,"amountDef":1304.39,"carDeposit":0,"carValueMin":null,"carValueMax":null,"uomMonths":null,"incomeMin":600,"incomeMax":3500,"outcomeMin":0,"outcomeMax":3500,"withAccount":null,"withInsurance":null,"clientIncome":null,"clientOutcome":null,"eligibilityScore":null,
      "segments":[
        {"idOm":1,"isClient":false,"showAccount":1,"showInsurance":2},
        {"idOm":1,"isClient":true,"showAccount":0,"showInsurance":1},
        {"idOm":0,"isClient":false,"showAccount":1,"showInsurance":2},
        {"idOm":0,"isClient":true,"showAccount":0,"showInsurance":1}
      ]
    })
  var options = {
    "data": postData,
    "options": {
      "host": "krediti.unicreditbank.si",
      "path": "/api/LoanEomGet",
      "method": "POST",
      "headers": {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //"Cookie": "ASP.NET_SessionId=l3nillj4s0lj2zriyrzarz3h",
        "Host": "krediti.unicreditbank.si",
        "Content-Length": Buffer.byteLength(postData),
        "Origin": "https://krediti.unicreditbank.si",
        "Referer": "https://krediti.unicreditbank.si/izracun-potrosniski-kredit",
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
      
      
      let loanOfferList = bodyDict["eom"];
      console.log(loanOfferList);
      // interestRateType: 1 == FIXED 
      // interestRateType: 0 == VARIABLE

      let fixedResponse = loanOfferList[0];
      let variableResponse = loanOfferList[1];

      
      var fixedResult = functions.extractLoanDataGeneric(fixedResponse);
      var variableResult = functions.extractLoanDataGeneric(variableResponse);

      pushData("fixed", fixedResult)
      pushData("variable", variableResult)

    
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
