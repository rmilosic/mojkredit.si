'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');

console.log('Loading function');

module.exports.gotovinskiCalc = (event, context, callback) => {


  const options = {
    hostname: 'www.hipkredit.si',
    port: 443,
    path: '/OnlineLoans/informativniIzracun.xhtml',
    method: 'GET'
  };
  
  const req = https.request(options, (res) => {
    
    let cookie = res.headers['set-cookie'][0];
    let body = '';
    console.log('extracted cookie:', cookie);
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      body += d.toString();
    });
    res.on('end', () => {
      /* TODO: extract view state https://stackoverflow.com/questions/12175763/how-to-programmatically-send-post-request-to-jsf-page-without-using-html-form*/
      console.log(body);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}