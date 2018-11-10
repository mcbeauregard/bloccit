const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", () => {

//#3
      request.get(base, (err, res, body) => {
        expect(body).toContain("Welcome to Bloccit");

//#4
        done();
      });
    });

  });

  describe("GET /about", () => {

    it("should return status code 200 and have 'About us' in the body of the response", () => {
          request.get(base + 'about', (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(body).toContain("About us");
            done();
          });
        });
    
      });
      
  });

  