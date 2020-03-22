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

  // QUERYSTRING
  let message = `intTipKredita=1&decVolumen=${Math.round(queryData['creditAmount'])}&intSteviloOdplacil=${queryData['creditTime']}&MojaPlaca=&MesecneObveznosti=&DrugeMesecneObveznosti=`
  
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

      console.log("finalResult", finalResult)
      console.log("fixedResponse", fixedResponse)

      var fixedResult = functions.extractLoanDataGeneric(fixedResponse, queryData["creditAmount"]);
      // N/A variable
      // var variableResult = functions.extractLoanDataGeneric(variableResponse, queryData["creditAmount"]);

      
      pushData("fixed", fixedResult)

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
