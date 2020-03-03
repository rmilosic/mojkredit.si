'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');
const querystring = require('querystring');


console.log('Loading function');

module.exports.handler = (event, context, callback) => {

  console.log(event);

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

      let htmlData = htmlParser.parse(bodyDict['data'].toString())
      
      let returnData = {};
      htmlData.querySelectorAll(".infResultHeader").map((elem) => {
        elem.querySelectorAll("table tr td").map((elem) => {

          var splitFields = elem.structuredText.split("\n");
          returnData[splitFields[0]] = splitFields[1]
          })
      })

      htmlData.querySelectorAll(".infResultContent").map((elem) => {
        elem.querySelectorAll("tr").slice(1, -1).map((elem) => {
          var _key = elem.querySelectorAll("td")[0].rawText.replace(':', '');
          var _value = elem.querySelectorAll("td")[1].rawText
          returnData[_key] = _value
          })
      })

      console.log(returnData);
      var responseData = {
        "monthlyAnnuity": returnData['Mesečna anuiteta'].split(" ")[0],
        "annualInterestRate": returnData['Obrestna mera'],
        "totalLoanCost": returnData['Skupni stroški kredita'].split(" ")[0],
        "effectiveInterestRate": returnData['Efektivna obrestna mera (EOM)'],
        "totalAmountPaid": returnData['Skupni znesek, ki ga mora plačati potrošnik'].split(" ")[0],
      }
                    
      console.log(responseData);

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

  req.on('error', callback);
  
  req.write(options.data);
  req.end();
  

};
