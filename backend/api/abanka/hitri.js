'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
var functions = require('./functions');
var zlib = require('zlib');

// console.log('Loading function');

module.exports.handler = (event, context, callback) => {

  // var finalResult = {
  //   fixed: null,
  //   variable: null
  // }

  var queryData = event.queryStringParameters;


  // function pushData(type, result){
  //   finalResult[type] = result;
  // }



  function returnCalculation () {
    const post_options = {
      "options": {
        "host": "www.abanka.si",
        "path": "/.rest/abp/informative-calculations/v1/credits/calculate",
        "method": "POST",
        "encoding": null,
        "headers": {
          "Accept": "application/json, text/javascript, */*; q=0.01",
          "Accept-Encoding": "gzip, deflate, br",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Content-Type": "application/json; charset=UTF-8",
          "Host": "www.abanka.si",
          "Origin": "https://www.abanka.si",
          "Referer": "https://www.abanka.si/krediti/informativni-izracun",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
          "Sec-Fetch-Site": "same-origin",
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    }
    var data = {"namenId": 3, "zavarovanjeId": 10, "komitentnost": true, "placaNaTRR": true, "vrstaIzracunaId": 0, "znesekKredita": queryData['creditAmount'], "doba": queryData['creditTime'] };
    // var data = {"namenId": "1", "zavarovanjeId": "10", "komitentnost": "true", "placaNaTRR": "true", "vrstaIzracunaId": "0", "znesekKredita": "25000", "doba": "120" }
    var post_data = JSON.stringify(data);
    console.log("post data: \n", post_data);
    


    const req = https.request(post_options.options, (res) => {
      
      var chunks = [];
      
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      // res.setEncoding('utf8');
     
      res.on('data', function(chunk) {
          // decompression chunk ready, add it to the buffer
          chunks.push(Buffer.from(chunk));

      }).on("end",  function() {
        console.log('chunks \n', chunks);
        var buffer = Buffer.concat(chunks);


        zlib.gunzip(buffer, function(err, decoded) {
          if (err) {
            // console.log(err);
          }
          let body = decoded.toString();
          console.log("body: \n", body.toString());


          // Process body

          let responseList = JSON.parse(body);
          console.log('response list \n', responseList);
          
          var finalList = [];
          responseList.map((response) => {
            var offerList = functions.extractLoanDataGeneric(response);
            var transformedObject = {
              offerTitle: null,
              fixed: null,
              variable: null
            }

            offerList.map((offer) => {
              transformedObject["offerTitle"] = offer["offerTitle"];

              switch (offer["omType"]) {
                case "fixed":
                  transformedObject["fixed"] = offer;
                  break;

                case "variable":
                  transformedObject["variable"] = offer;
                  break;

              }
            });
          
          finalList.push(transformedObject);

          });

          console.log("result \n", finalList.flat());

          callback(null, {
            statusCode: 200,
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
              "message": 'Executed successfully',
              "input": event,
              "data": finalList
            })
          })
      

        });

      }).on("error", function(e) {
          callback(e);
      })

     
    });

    req.on('error', callback);
    req.write(post_data);
    req.end();

  }


  returnCalculation()

};
