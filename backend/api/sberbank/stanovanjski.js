'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');

console.log('Loading function');

module.exports.stanovanjskiCalc = (event, context, callback) => {

  /*console.log(event);*/

  var queryData = event['queryStringParameters'];
  
  /*console.log(queryData);*/

  var options = {
    "data": `id=17&nacinZavarovanja=${queryData['creditInsurance']}&namenKredita=2&oblikaSodelovanja=2&valuta=1&vrstaOM=2&znesekKredita=${queryData['creditAmount']}
    &odplacilnaDoba=${queryData['creditTime']}&zadnjaMesecnaAnuiteta=0&elektronskiNaslov=&format=html`,
    "options": {
      "host": "www.sberbank.si",
      "path": "/scredits/?command=calculate",
      "method": "POST",
      "headers": {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "ASP.NET_SessionId=l3nillj4s0lj2zriyrzarz3h",
        "Host": "www.sberbank.si",
        "Origin": "https://www.sberbank.si",
        "Referer": "https://www.sberbank.si/izracun-stanovanjski-kredit",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
      }
    }
  }
  /*console.log(options.data);*/

  /*console.log(event);*/
  const req = https.request(options.options, (res) => {
    
    let body = '';

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk.toString();
    });
    res.on('end', () => {
        /*console.log('Successfully processed HTTPS response');*/
        /*console.log(res.headers)*/
        parseString(body, function (err, result) {
          // console.dir will allow us to print the whole object in our console
          body = result['data']['resultText'];
          
          var parsedBodyRoot = htmlParser.parse(body.toString())

          var monthlyAnnuity = parsedBodyRoot.querySelectorAll(".calculation-item")[0].querySelectorAll("div")[1].rawText
          var annualInterestRate = parsedBodyRoot.querySelectorAll(".calculation-item")[6].querySelectorAll("div")[1].rawText
          var totalLoanCost = parsedBodyRoot.querySelectorAll(".calculation-item")[10].querySelectorAll("div")[1].rawText
          var effectiveInterestRate = parsedBodyRoot.querySelectorAll(".calculation-item")[11].querySelectorAll("div")[1].rawText
          var totalAmountPaid = parsedBodyRoot.querySelectorAll(".calculation-item")[12].querySelectorAll("div")[1].rawText

          var responseData = {
            "monthlyAnnuity": monthlyAnnuity.replace(/(\r\n|\r|\n|€| )/g, ""),
            "annualInterestRate": annualInterestRate.replace(/(\r\n|\r|\n)/g, ""),
            "totalLoanCost": totalLoanCost.replace(/(\r\n|\r|\n|€| )/g, ""),
            "effectiveInterestRate": effectiveInterestRate.replace(/(\r\n|\r|\n|€| )/g, ""),
            "totalAmountPaid": totalAmountPaid.replace(/(\r\n|\r|\n|€| )/g, "")
          }
                    
        
          /*console.log(responseData);*/
          callback(null, {
            statusCode: 200,
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
              "message": 'Executed successfully',
              "input": event,
              "data": responseData
            })
          })
      });
      

    
    });
  });

  req.on('error', callback);
  
  req.write(options.data);
  req.end();
  

};
