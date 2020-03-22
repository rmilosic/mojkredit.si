'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');
const querystring = require('querystring');
var functions = require('./functions');


console.log('Loading function');

module.exports.handler = (event, context, callback) => {


  // return object
  var finalResult = {
    fixed: null,
    variable: null
  }

  function pushData(type, result){
    finalResult[type] = result;
  }

  var queryData = event.queryStringParameters;
  

  // QUERYSTRING
  let message  = `loan_offer%5BinterestType%5D=1&loan_offer%5BloanAmount%5D=${queryData['creditAmount']}&loan_offer%5BpayoffPeriod%5D=${queryData['creditTime']}&loan_offer%5BproductCode%5D=11`;

  let queryString = querystring.parse(message, null, null);

  var options = {
    "data": querystring.encode(queryString),
    "options": {
      "host": "www.skb.si",
      "path": "/_loan_offer_ajax/11",
      "method": "POST",
      "headers": {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //"Cookie": "ASP.NET_SessionId=l3nillj4s0lj2zriyrzarz3h",
        "Host": "www.skb.si",
        "Origin": "https://www.skb.si",
        "Referer": "https://www.skb.si/sl/osebne-finance/krediti/potrosniski-kredit/informativni-izracun",
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
      let htmlData = htmlParser.parse(bodyDict['data'].toString());
      
      console.log("html", htmlData)

      // Both fixed and variable OM divs
      let resultDivs = htmlData.querySelectorAll(".infResult");

      // Get fixed OM data
      let fixedSection = resultDivs[0];
      let variableSection = resultDivs[1];

      var fixedResult = functions.extractLoanDataGeneric(fixedSection);
      var variableResult = functions.extractLoanDataGeneric(variableSection);
      
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
