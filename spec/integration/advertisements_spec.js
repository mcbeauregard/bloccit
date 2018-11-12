const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {

  beforeEach((done) => {
    this.advertisement;
    sequelize.sync({force: true}).then((res) => {

      Advertisement.create({
       title: "Ad display",
       description: "There is a lot of them"
     })
      .then((advertisement) => {
        this.advertisement = advertisement;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /advertisements", () => {

    it("should return a status code 200 and all advertisments", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisements");
        expect(body).toContain("Ad display");
        done();
      });
    });
  });

  describe("GET /advertisements/new", () => {

    it("should render a new advertisement form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
        });
     });
    });

    describe("POST /advertisements/create", () => {
        const options = {
          url: `${base}create`,
          form: {
            title: "blink-182 songs",
            description: "What's your favorite blink-182 song?"
          }
        };
  
        it("should create a new advertisement and redirect", (done) => {
          request.post(options,
            (err, res, body) => {
              Advertisement.findOne({where: {title: "blink-182 songs"}})
              .then((advertisement) => {
                expect(res.statusCode).toBe(303);
                expect(advertisement.title).toBe("blink-182 songs");
                expect(advertisement.description).toBe("What's your favorite blink-182 song?");
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
      });

      describe("GET /advertisements/:id", () => { // semi-colon in the URI indicates that id is the URL parameter. An id is passed in the request.

        it("should render a view with the selected advertisement", (done) => {
          request.get(`${base}${this.advertisement.id}`, (err, res, body) => { // make a request and pass in the ID of the advertisement we created in the beforeEach call.
            expect(err).toBeNull();
            expect(body).toContain("Ad display"); // set the success code, include the view for the tile of the advertisement
            done();
          });
        });
   
      });

      describe("POST /advertisements/:id/destroy", () => {

        it("should delete the advertisement with the associated ID", (done) => {
   
    //#1 returns all the record in the table (this is a Sequelize model)
    Advertisement.all()
          .then((advertisements) => {
   
    //#2  once returned, store the number of advertisements returned from the database...
            const advertisementCountBeforeDelete = advertisements.length;
            expect(advertisementCountBeforeDelete).toBe(1); // then set the expectation that there should only be one record.
   
    //#3 delete request
            request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
              Advertisement.all() // get all the advertisements from the table...
              .then((advertisements) => {
                expect(err).toBeNull();
                expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1); // and make sure we reduced the number of advertisements by one. 
                done();
              })
   
            });
          });
   
        });
   
      });

      describe("GET /advertisements/:id/edit", () => {

        it("should render a view with an edit advertisement form", (done) => {
          request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Edit Advertisement");
            expect(body).toContain("Ad display");
            done();
          });
        });
   
      });

      describe("POST /advertisements/:id/update", () => {

        it("should update the advertisement with the given values", (done) => {
           const options = {
              url: `${base}${this.advertisement.id}/update`,
              form: {
                title: "Updated advertisement",
                description: "This is an updated ad"
              }
            };
   //#1 call post and pass our object with the URL and form properties we need.
            request.post(options,
              (err, res, body) => {
   
              expect(err).toBeNull();
   //#2 set expectation that there should be no error and that we changed the title of the advertisement.
            Advertisement.findOne({
                where: { id: this.advertisement.id }
              })
              .then((advertisement) => {
                expect(advertisement.title).toBe("Updated advertisement");
                done();
              });
            });
        });
   
      });

  });