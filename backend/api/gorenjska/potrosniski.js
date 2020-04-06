'use strict';
var parseString = require('xml2js').parseString;
var https = require('https');
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

  // TODO: document
  function calculateFixed () {
    
    
    var get_params = `id=6&f_znesek=${queryData["creditAmount"]}&f_placa=&f_mes_obv=&f_trajanje_meseci=${queryData['creditTime']}&f_trajanje_leta=&f_obm=&f_status=1&f_zavarovanje=0&f_namen=1&f_dan_koriscenja=02`
    var url = `https://www.gbkr.si/api/izracun?${get_params}`;

    var body = ``;
    
    // console.log("fixed calc started");
    // console.log(variable_get_options.data);
    var get_req = https.get(url, (res) => {
      // console.log('statusCode:', res.statusCode);
      // console.log('headers:', res.headers);
            
      res.on('data', (d) => {
        // process.stdout.write(d);
        body += d.toString();
      });
      
      // On end parse body as JSON
      res.on('end', () => {
        
        // console.log("fixed body: \n", body);
        
        let body_dict = JSON.parse(body);
        // console.log("fixed body json: \n", body_dict);

        let data = body_dict["data"];
        var fixedResults = functions.extractLoanDataGeneric(data);
        
        pushData("fixed", fixedResults)

        // return callback

        console.log(finalResult)
        
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

    }).on('error', (e) => {
      console.error(e);
    });
    
    get_req.end();

  }

  function calculateVariable () {
    
    var get_params = `id=13&f_znesek=${queryData["creditAmount"]}&f_placa=&f_mes_obv=&f_trajanje_meseci=${queryData['creditTime']}&f_trajanje_leta=&f_obm=&f_status=1&f_zavarovanje=0&f_namen=1&f_dan_koriscenja=02`;
    
    var url = `https://www.gbkr.si/api/izracun?${get_params}`;
    
    var body = ``;
    
    // console.log(variable_get_options.data);
    var get_req = https.get(url, (res) => {
      // console.log('statusCode:', res.statusCode);
      // console.log('headers:', res.headers);
            
      res.on('data', (d) => {
        // process.stdout.write(d);
        body += d.toString();
      });
      
      // On end parse body as JSON
      res.on('end', () => {
        
        let body_dict = JSON.parse(body);
        
        let data = body_dict["data"];
        var variableResults = functions.extractLoanDataGeneric(data);
        
        pushData("variable", variableResults)

        // call calculateFixed
        
        calculateFixed()
      });

    }).on('error', (e) => {
      console.error(e);
    });
    
    get_req.end();
    

    // const req_2 = http.get(url, (res) => {
    
    //   let body = '';
  
    //   res.setEncoding('utf8');
    //   res.on('data', (chunk) => {
    //       body += chunk.toString();
    //   });
    //   res.on('end', () => {
        // console.log('Successfully processed HTTPS response');
        // console.log(res.headers)

          // console.log("")
          // console.log(body)
          // console.log(body["data"])
    //       // console.dir will allow us to print the whole object in our console
    //       body = result['data']['resultText'];
          

    //       // external function
    //       var parseResult = functions.extractLoanDataGeneric(body)
          
    //       pushData("variable", parseResult);
          
    //       calculateFixed();
          

    //   });
    // });

    // req_2.on('error', callback);

    // req_2.end();

  }

  calculateVariable()

};
