"use strict";

var seaport = require("seaport");
var http = require("http");
var config = require("./config");
var version = require("./package").version;


module.exports = function (seaportLocation, seaportPort) {
    var port = seaport.connect(seaportLocation, seaportPort);

    var server = http.createServer(function (req, res) {
        res.end(JSON.stringify(config));
    });
    server.listen(port.register("registry@" + version));
};
