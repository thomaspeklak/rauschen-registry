"use strict";
/*global describe:false, it:false, before: false, after: false, beforeEach: false, afterEach: false */
process.env.NODE_ENV = "test";

var expect = require("chai").expect;
var seaport = require("seaport");
var server = require("../server");
var client = require("../client");

describe("Registry", function () {
    it("should delivery the rauschen config", function (done) {
        var ports = seaport.createServer();
        ports.listen();
        var port = ports.address().port;

        server("localhost", port);

        var config = client("localhost", port);
        config.on("update", function () {
            var data = config.get("data");
            expect(data.domains).to.include("test.com");
            done();
        });
    });
});
