"use strict";
/*global describe:false, it:false, before: false, after: false, beforeEach: false, afterEach: false, expect:false */
process.env.NODE_ENV = "test";

var expect = require("chai").expect;
var seaport = require("seaport");
var request = require("request");
var version = require("../package").version;


describe("Registry", function () {
    it("should delivery the rauschen config", function (done) {
        var port = seaport.createServer();
        port.listen();
        require("../app")("localhost", port.address().port);

        port.get("registry@" + version, function (ps) {
            request.get("http://localhost:" + ps[0].port, function (err, res) {
                var body = JSON.parse(res.body);

                expect(body.domains).to.include("test.com");
                done();
            });
        });

    });
});
