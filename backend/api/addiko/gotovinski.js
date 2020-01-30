'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');
const querystring = require('querystring');

console.log('Loading function');

module.exports.gotovinskiCalc = (event, context, callback) => {


  let returnData = function(data){
    console.log(data);

    let message  = `javax.faces.partial.ajax=true&javax.faces.source=FRMInfoIzracun%3AsliderZnesek&javax.faces.partial.execute=FRMInfoIzracun%3Aznesek+FRMInfoIzracun%3AsliderZnesek&javax.faces.partial.render=FRMInfoIzracun%3Aznesek+FRMInfoIzracun%3AsliderZnesek+FRMInfoIzracun%3AkandidatniKrediti&javax.faces.behavior.event=slideEnd&javax.faces.partial.event=slideEnd&FRMInfoIzracun%3AsliderZnesek_slideValue=6200&FRMInfoIzracun=FRMInfoIzracun&FRMInfoIzracun%3AinfoNamenRadiobtn=com.hrc.onlineloans.entity.KatalogSkupinaLastnost%404e00e844&FRMInfoIzracun%3Aznesek_input=6.200+%E2%82%AC&FRMInfoIzracun%3Aznesek_hinput=6200&FRMInfoIzracun%3AdobaOdplacila_input=84+mes&FRMInfoIzracun%3AdobaOdplacila_hinput=84&javax.faces.ViewState=${data['viewState']}`
    let queryString = querystring.parse(message, null, null)

    console.log(queryString);

    const post_options = {
      "data": querystring.encode(queryString),
      "options": {
        "host": "www.hipkredit.si",
        "path": "/OnlineLoans/informativniIzracun.xhtml'",
        "method": "POST",
        "headers": {
          "Accept": "*/*",
          "Connection": "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": data['cookie'],
          "Host": "www.hipkredit.si",
          "Origin": "https://www.hipkredit.si",
          "Referer": "https://www.hipkredit.si/OnlineLoans/informativniIzracun.xhtml (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36",
          "Content-Length": Buffer.byteLength(message)
        
        }
      }
    }
    console.log('posting data')
    console.log(post_options)
    
    const req2 = https.request(post_options.options, (res2) => {
      
      let body = '';
  
      console.log('statusCode:', res2.statusCode);
      console.log('headers:', res2.headers);
      res2.setEncoding('utf8');
  
      res2.on('data', (chunk) => {
          body += chunk.toString();
      });
      res2.on('end', () => {
          /*console.log('Successfully processed HTTPS response');*/
          /*console.log(res.headers)*/
          console.log(body);          
      });
    
    });
  
    req2.on('error', callback);
    
    req2.write(post_options.data);
    req2.end();
  }

  const get_options = {
    hostname: 'www.hipkredit.si',
    port: 443,
    path: '/OnlineLoans/informativniIzracun.xhtml',
    method: 'GET'
  };
  
  /* GET REQUEST FOR COOKIE AND VIEWSTATE */
  const req = https.request(get_options, (res) => {
    
    let cookie = res.headers['set-cookie'][0];
    let body = '';
    /*console.log('extracted cookie:', cookie);
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);*/
  
    res.on('data', (d) => {
      body += d.toString();
    });
    res.on('end', () => {
      /* TODO: extract view state https://stackoverflow.com/questions/12175763/how-to-programmatically-send-post-request-to-jsf-page-without-using-html-form*/
      var parsedBodyRoot = htmlParser.parse(body.toString())
      var input_elems = parsedBodyRoot.querySelectorAll("input")
      var input_elems_raw = input_elems.map(elem => elem.attributes);
      /*console.log(input_elems_raw);*/
      var filtered = input_elems_raw.filter(elem => elem['name'] == 'javax.faces.ViewState');
      /*console.log("filtered", filtered);*/
      returnData({
        "cookie": cookie,
        "viewState": filtered[0]['value']
      });
    });
    
  });
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.end()
  

  
  



}