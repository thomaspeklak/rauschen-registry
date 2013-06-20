"use strict";

var seaportLocation = process.argv[2] || "localhost";
var seaportPort = process.argv[3] ||  9200;

require("./app")(seaportLocation, seaportPort);
