"use strict";
process.env.NODE_ENV = "test";

var seaport = require("seaport");
var server = require("../server");
var client = require("../client");


var ports = seaport.createServer();
ports.listen();
var port = ports.address().port;

server("localhost", port);

var config = client("localhost", port);
config.on("update", function () {
    console.dir(config.get("data"));
});
