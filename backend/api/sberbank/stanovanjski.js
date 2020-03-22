'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');
var functions = require('./functions');


console.log('Loading function');

module.exports.handler = (event, context, callback) => {

  // VrstaOM = 1 : FIKSNA
  // VrstaOM = 2 : SPREMENLJIVA

  var finalResult = {
    fixed: null,
    variable: null
  }

  var queryData = event.queryStringParameters;

  function pushData(type, result){
    finalResult[type] = result;
  }

  const post_options = {
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

  function calculateFixed () {
    var fixed_post_options = {
      "data": `id=17&nacinZavarovanja=${queryData['creditInsurance']}&namenKredita=2&oblikaSodelovanja=2&valuta=1&vrstaOM=1&znesekKredita=${queryData['creditAmount']}
    &odplacilnaDoba=${queryData['creditTime']}&zadnjaMesecnaAnuiteta=0&elektronskiNaslov=&format=html`,
      "options": post_options
    }

    const req = https.request(fixed_post_options.options, (res) => {
    
      let body = '';
  
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
          body += chunk.toString();
      });
      res.on('end', () => {
        
        parseString(body, function (err, result) {
          // console.dir will allow us to print the whole object in our console
          body = result['data']['resultText'];
          
          // external function
          var parseResult = functions.extractLoanDataGeneric(body)
          
          pushData("fixed", parseResult);

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
    });

    req.on('error', callback);
    req.write(fixed_post_options.data);
    req.end();

  }

  function calculateVariable () {
    var variable_post_options = {
      "data": `id=17&nacinZavarovanja=${queryData['creditInsurance']}&namenKredita=2&oblikaSodelovanja=2&valuta=1&vrstaOM=2&znesekKredita=${queryData['creditAmount']}
         &odplacilnaDoba=${queryData['creditTime']}&zadnjaMesecnaAnuiteta=0&elektronskiNaslov=&format=html`,
      "options": post_options
    }

    const req = https.request(variable_post_options.options, (res) => {
    
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
          
          // external function
          var parseResult = functions.extractLoanDataGeneric(body)
          
          pushData("variable", parseResult);
          
          calculateFixed();
          
        });

      });
    });

    req.on('error', callback);

    req.write(variable_post_options.data);
    req.end();

  }

  calculateVariable()

};
