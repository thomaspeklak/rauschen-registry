"use strict";

var seaport = require("seaport");
var version = require("./package").version;
var net = require("net");
var Scuttlebutt = require("scuttlebutt/model");

module.exports = function (host, port) {
    var ports = seaport.connect(host, port);

    var config = new Scuttlebutt();
    ports.get("registry@" + version, function (ps) {
        var registryStream = net.connect(ps[0]);
        registryStream.pipe(config.createStream()).pipe(registryStream);
    });

    return config;
};
