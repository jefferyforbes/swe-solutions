const app = require("./server"); // Link to your server file
const request = require("supertest");

describe("GET /some-route", function () {
  it("does something", function (done) {
    request(app).end(done);
  });
});
