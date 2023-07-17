var ENV = null;
ENV = "Dev";//Development
// ENV = "Live";//live
// ENV = "Testing"; //Testing


if (ENV == "Dev") {
    var ipwithport = "172.16.0.164:3300";
    var ip = "172.16.0.164";
    var port = "3300";

}

exports.ENV = ENV;
exports.port = port;