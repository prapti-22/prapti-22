const jwt = require("jsonwebtoken")
const https= require("https")
// const app =require("./info")
const fs= require("fs")
const privateKey=fs.readFileSync("./AuthKey_G5R3G6XBNG.p8")
const apiKeyId= "G5R3G6XBNG"
const  IssuerId="d3e05c77-2259-4937-a14f-841e66831236"
let now = Math.round((new Date()).getTime() / 1000);
let nowPlus20 = now + 1199

let payload = {
    "iss": IssuerId,
    "exp": nowPlus20,
    "aud": "appstoreconnect-v1"
}

let signOptions = {
    "algorithm": "ES256", 
    header : {
        "alg": "ES256",
        "kid": apiKeyId,
        "typ": "JWT"
    }
};

let token = jwt.sign(payload, privateKey, signOptions);

var options={
    host:"api.appstoreconnect.apple.com",
    // path:"https://api.appstoreconnect.apple.com/v1/bundleIds",
    // path:"https://api.appstoreconnect.apple.com/v1/users",
    path:"https://api.appstoreconnect.apple.com/v1/certificates/6ed39e7e-4c71-4da3-9996-dbde8fb663e0",
    //path:"https://api.appstoreconnect.apple.com/v1/users/6ed39e7e-4c71-4da3-9996-dbde8fb663e0",
    //path:"https://api.appstoreconnect.apple.com/v1/userInvitations",
    //path:"https://api.appstoreconnect.apple.com/v1/users/6ed39e7e-4c71-4da3-9996-dbde8fb663e0/relationships/visibleApps",
    //path sales report  path:"https://api.appstoreconnect.apple.com/v1/financeReports?filter[reportDate]=2018-01&filter[reportType]=FINANCIAL&filter[regionCode]=US&filter[vendorNumber]=87860268"
    method: 'GET',
    headers: {
        //"Accept":'application/a-gzip ' for sales  report type
        "Accept": ' application/json',
        "Authorization":'Bearer ' + token
    }

}

var req = https.request(options, function(res){
    console.log("\n");
    console.log('STATUS:'+ res.statusCode);
    console.log("\n");
    console.log('HEADERS:'+ JSON.stringify(res.headers));
    res.setEncoding("utf8");
    res.on('data',function(chunk){
        console.log("\n");
        console.log('BODY:'+ chunk);
    })
    
    
})
req.on('error',function(e){
    console.log('problem with request'+ e.message);

})
req.end();


