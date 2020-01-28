'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');

console.log('Loading function');

module.exports.gotovinskiCalc = (event, context, callback) => {


  const options = {
    hostname: 'https://www.hipkredit.si/OnlineLoans/informativniIzracun.xhtml',
    port: 443,
    path: '/',
    method: 'GET'
  };
  a
  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();



  /*console.log(event);

  var queryData = event['queryStringParameters'];
  
  /*console.log(queryData);*/

  var options = {
    "data": `FRMInfoIzracun%3AsliderZnesek_slideValue=${queryData["creditAmount"]}
    &FRMInfoIzracun=FRMInfoIzracun&FRMInfoIzracun%3AinfoNamenRadiobtn=
    com.hrc.onlineloans.entity.KatalogSkupinaLastnost%405ecef7a3
    &FRMInfoIzracun%3Aznesek_input=11.700+%E2%82%AC
    &FRMInfoIzracun%3Aznesek_hinput=11700&FRMInfoIzracun%3AdobaOdplacila_input=${queryData["creditTime"]}+mes
    &FRMInfoIzracun%3AdobaOdplacila_hinput=84`,
    "options": {
      "host": "www.hipkredit.si",
      "path": "/OnlineLoans/informativniIzracun.xhtml",
      "method": "POST",
      "headers": {
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "JSESSIONID=ae841cbc65981674dfbee484cafa",
        "Host": "www.hipkredit.si",
        "Origin": "https://www.hipkredit.si",
        "Referer": "https://www.hipkredit.si/OnlineLoans/informativniIzracun.xhtml",
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
