'use strict';
var parseString = require('xml2js').parseString;
const https = require('https');
const htmlParser = require('node-html-parser');
const querystring = require('querystring');

console.log('Loading function');

module.exports.gotovinskiCalc = (event, context, callback) => {

  // HERE IS THE SECOND POST REQUEST WITH VIEWSTATE AND SET COOKIE 
  let returnData = function(data){
    console.log(data);

    // QUERYSTRING
    let message  = `javax.faces.partial.ajax=true&javax.faces.source=FRMInfoIzracun%3AsliderZnesek&javax.faces.partial.execute=FRMInfoIzracun%3Aznesek+FRMInfoIzracun%3AsliderZnesek&javax.faces.partial.render=FRMInfoIzracun%3Aznesek+FRMInfoIzracun%3AsliderZnesek+FRMInfoIzracun%3AkandidatniKrediti&javax.faces.behavior.event=slideEnd&javax.faces.partial.event=slideEnd&FRMInfoIzracun%3AsliderZnesek_slideValue=18100&FRMInfoIzracun=FRMInfoIzracun&FRMInfoIzracun%3AinfoNamenRadiobtn=com.hrc.onlineloans.entity.KatalogSkupinaLastnost%401e2783f5&FRMInfoIzracun%3Aznesek_input=18.100+%E2%82%AC&FRMInfoIzracun%3Aznesek_hinput=18100&FRMInfoIzracun%3AdobaOdplacila_input=84+mes&FRMInfoIzracun%3AdobaOdplacila_hinput=84&javax.faces.ViewState=${data['viewState']}`
    let queryString = querystring.parse(message, null, null)

    console.log(queryString);

    //POST OPTIONS
    const post_options = {
      "data": querystring.encode(queryString),
      "options": {
        "host": "www.hipkredit.si",
        "path": "/OnlineLoans/informativniIzracun.xhtml'",
        "method": "POST",
        "headers": {
          "Accept": "application/xml, text/xml, */*; q=0.01",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Content-Length": Buffer.byteLength(message),
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": `${data['cookie']}; cookieWarning=disable; primefaces.download=null; _ga=GA1.2.363835531.1578038401; __mauuid=4a0a61d3-9a37-43d8-a591-14266f731dcb; __mauuid=4a0a61d3-9a37-43d8-a591-14266f731dcb; __mauuid=4a0a61d3-9a37-43d8-a591-14266f731dcb; _fbp=fb.1.1578038401920.34252157; _gid=GA1.2.1440367939.1580662854`,
          "Faces-Request": "partial/ajax",
          "Host": "www.hipkredit.si",
          "Origin": "https://www.hipkredit.si",
          "Referer": "https://www.hipkredit.si/OnlineLoans/informativniIzracun.xhtml",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",        
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Pragma": "no-cache"
        }
      }
    }

    console.log('posting data')
    console.log(post_options)
    
    // POST REQUEST TO GET FINAL DATA
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

  // FIRST GET REQUEST OPTIONS
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
      console.log(parsedBodyRoot.querySelectorAll("form"))
      console.log(parsedBodyRoot.querySelectorAll("input"))

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