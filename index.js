var CryptoJS = require("crypto-js");

module.exports = async function (context, req) {
    var now = new Date().toUTCString();

    var verb = 'GET';
    var resourceType = 'offers';
    var resourceId = '';
    
    var text = (verb || "").toLowerCase() + "\n" + (resourceType || "").toLowerCase() + "\n" + (resourceId || "") + "\n" + now.toLowerCase() + "\n" + "" + "\n";
    var key = CryptoJS.enc.Base64.parse('Cosmos-Primary-Key');
    var signature = CryptoJS.HmacSHA256(text, key).toString(CryptoJS.enc.Base64);
    
    var MasterToken = "master";
    var TokenVersion = "1.0";
    var authToken = encodeURIComponent("type=" + MasterToken + "&ver=" + TokenVersion + "&sig=" + signature);
    
    var output = {token:authToken, utcdate:now};

    context.res = {
        body: output
    };
};