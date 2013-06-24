"use strict";

var seaport = require("seaport");
var net = require("net");
var configValues = require("./config");
var version = require("./package").version;
var Scuttlebutt = require("scuttlebutt/model");
var config = new Scuttlebutt();
config.set("data", configValues);

module.exports = function (host, port) {
    var ports = seaport.connect(host, port);

    var server = net.createServer(function (stream) {
        stream.pipe(config.createStream()).pipe(stream);
    });
    server.listen(ports.register("registry@" + version));
};
