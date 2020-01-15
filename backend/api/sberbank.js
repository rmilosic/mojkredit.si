'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');

console.log('Loading function');

module.exports.potrosniskiCalc = (event, context, callback) => {

  var form_data = event.data;
  console.log(form_data);

  var options = {
    "data": `id=4&nacinZavarovanja=${form_data['creditInsurance']}&namenKredita=1&oblikaSodelovanja=1&valuta=1&vrstaOM=2&znesekKredita=${form_data['creditAmount']}
    &odplacilnaDoba=${form_data['creditTime']}&zadnjaMesecnaAnuiteta=0&elektronskiNaslov=&format=html`,
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
        "Referer": "http://www.sberbank.si/scredits/?command=calculate",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
      }
    }
  }
  console.log(options.data);

  console.log(event);
  const req = https.request(options.options, (res) => {
    
    let body = '';

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk.toString();
    });
    res.on('end', () => {
        console.log('Successfully processed HTTPS response');
        console.log(res.headers)
        parseString(body, function (err, result) {
          // console.dir will allow us to print the whole object in our console
          body = result['data']['resultText'];
          
          var parsedBodyRoot = htmlParser.parse(body.toString())
          
          var monthly_annuity = parsedBodyRoot.querySelectorAll(".calculation-item")[0].querySelectorAll("div")[1].rawText
          var annual_interest_rate = parsedBodyRoot.querySelectorAll(".calculation-item")[6].querySelectorAll("div")[1].rawText
          var total_loan_cost = parsedBodyRoot.querySelectorAll(".calculation-item")[10].querySelectorAll("div")[1].rawText
          var effective_interest_rate = parsedBodyRoot.querySelectorAll(".calculation-item")[11].querySelectorAll("div")[1].rawText
          var total_amount_paid = parsedBodyRoot.querySelectorAll(".calculation-item")[12].querySelectorAll("div")[1].rawText
          console.log(monthly_annuity)
          console.log(annual_interest_rate)
          console.log(total_loan_cost)
          console.log(effective_interest_rate)
          console.log(total_amount_paid)
          
          // TODO: return JSON response
          /*callback(null, parsedBodyRoot.querySelecto(".calculation-item"))*/
      });
      
      
    
    });
    
  });
  req.on('error', callback);
  req.write(options.data);
  req.end();
  

};
